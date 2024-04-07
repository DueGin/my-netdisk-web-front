<template>
  <n-upload
      class="upload-ctn"
      :multiple="isMultiple"
      directory-dnd
      :action="uploadUrl"
      :max="30"
      :headers="{Authorization: tokenHeader}"
      show-download-button
      @download="onDownload"
      show-remove-button
      @remove="onRemove"
      :custom-request="customRequest"
      :disabled="uploadingCounter.getCount() !== 0"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <Icon icon="ion:archive-outline"/>
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        点击或者拖动文件到该区域来上传
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
      </n-p>
    </n-upload-dragger>
  </n-upload>
</template>

<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {useMainStore} from "@/store/store.ts";
import {UploadCustomRequestOptions, UploadFileInfo} from "naive-ui";
import {reactive, ref} from 'vue';
import {getExif} from "@/utils/ExifUtil.ts";
import ExifDTO from "@/model/exif/ExifDTO.ts";
import {timestampToDateTime} from "@/utils/dateTime/DateTimeUtil.ts";
import {useGeoStore} from "@/store/geoStore/GeoStore.ts";
import {notification} from "@/utils/tip/TipUtil.ts";
import {deleteFile, preUploadFileCheck} from "@/apis/file/FileApi.ts";
import SparkMD5 from "spark-md5";
import request from "@/utils/request/request.ts";
import AsyncCounter from "@/utils/counter/AsyncCounter.ts";


const props = defineProps({
  uploadUrl: {
    type: String,
    default: import.meta.env.VITE_APP_BASE_API + '/upload'
  },
  uploadFile: {
    type: Array,
    default: []
  },
  isAnalysisExif: {
    type: Boolean,
    default: false
  },
  isMultiple: {
    type: Boolean,
    default: false
  },
  bucketName: {
    type: String,
    required: true,
  },
  chunkSize: {
    type: Number,
    default: 1024 * 500
  }
});

const emits = defineEmits(['finish']);

const tokenHeader = ref('');
tokenHeader.value = <string>useMainStore().token;
const uploadingCounter = reactive<AsyncCounter>(new AsyncCounter());

// 文件获取hash值
const getFileMD5 = (file: File) => {
  return new Promise((resolve, reject) => {
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader()

    fileReader.onload = (e: ProgressEvent<FileReader>): void => {
      spark.append(<ArrayBuffer>e.target?.result)
      resolve(spark.end())
    }
    fileReader.onerror = () => {
      reject('')
    }
    fileReader.readAsArrayBuffer(file)
  })
}

/**
 * 生成64位哈希值，由SHA-256算法获取
 * @param file
 */
async function calculateFileSHA256(file: Blob): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}


const onBeforeUpload = async (options: {
  file: UploadFileInfo,
  fileList: UploadFileInfo[]
}): Promise<boolean | void | any> => {
  let nFile = options.file;
  console.log("before")
  console.log(nFile);

  // 对文件做限制
  if (nFile.file?.size > 10485760) {
    notification.error({
      title: '暂时不支持上传超过10M的照片',
      content: '除非你给钱我换服务器🫤',
      duration: 1688
    });
    uploadingCounter.increment(-1);
    return false;
  }

  tokenHeader.value = <string>useMainStore().token;

  // 获取md5值
  let fileMD5 = await calculateFileSHA256(<File>nFile.file);

  // 传值后端校验md5，并申请uploadId
  let uploadId, md5;
  let preUploadDTO;
  await preUploadFileCheck(<String>fileMD5, nFile.type).then(res => {
    console.log(res)
    uploadId = res.data.uploadId;
    md5 = res.data.md5;
    preUploadDTO = res.data;
  });

  let res = {
    ...preUploadDTO,
    size: nFile.file?.size,
    name: nFile.name,
    lastModifiedDate: nFile.file?.lastModifiedDate,
    hasInfo: 1,
  }

  // md5校验报错了，就不上传了
  // if (preUploadDTO && preUploadDTO.exist === 1) {
  //   return res;
  // }

  if (!props.isAnalysisExif) {
    return res;
  }

  // 获取exif信息
  await getExif(nFile.file).then(async (dto: ExifDTO | any) => {
    console.log(dto)
    let v: ExifDTO = {
      originalDateTime: "",
      mimeType: "",
    };
    for (let dtoKey in dto) {
      if (dto[dtoKey] !== undefined) {
        console.log(dto[dtoKey])
        v[dtoKey] = dto[dtoKey];
      }
    }
    // 照片中没有拍摄时间的话，则读取在用户系统中的创建时间
    if (!v.originalDateTime) {
      v.originalDateTime = timestampToDateTime(nFile.file?.lastModified)
    }
    // 照片中没有mineType，则从系统读取的file拿
    if (!v.mimeType) {
      v.mimeType = <string>nFile.type;
    }

    // 没有经纬度的话，拿他当前所在经纬度传过来
    if (!(dto.longitude && dto.latitude)) {
      let geoStore = useGeoStore();
      await geoStore.getLngLat().then(res => {
        console.log(res)
        if (res && res.lng && res.lat && res.lng != 'NaN' && res.lat != 'NaN') {
          console.log(res.lng, typeof res.lng)
          v.longitude = res.lng;
          v.latitude = res.lat;
        }
      })
    }

    res = {...v, ...res};
  })

  return res;
}

const doFinish = (file: UploadFileInfo, res: any, onFinish) => {
  console.log(file, res)

  // 上传不成功，修改上传组件状态
  if (res.code !== 200 || !res.data) {
    file.status = 'error';
    notification.error({
      title: `${file.name}上传失败！`,
      content: res.msg,
      duration: 1888
    })
    return file;
  }

  notification.success({
    title: `${file.name}上传成功！`,
    duration: 888
  })

  // 文件对象名称
  file.name = res.data.fileName;

  // 文件URL
  file.url = res.data.url;

  file.status = 'finished';

  onFinish();

  // 执行自定义回调
  emits('finish', file);
  return file
}

const uploadProgressMap: Map<String, AsyncCounter> = new Map<String, AsyncCounter>();

const uploadChunk = (formData: FormData,
                     onProgress: (e: {
                       percent: number;
                     }) => void,
                     progressAddNum: number,
                     file: UploadFileInfo,
                     onFinish,
                     onError) => {
  uploadingCounter.increment(1);
  request.post(<string>props.uploadUrl, formData, {
    headers: {"Content-Type": 'application/x-www-form-urlencoded'}
  }).then(res => {
    console.log(res)
    let uploadId: string = <string>formData.get("uploadId");
    let asyncCounter: AsyncCounter = <AsyncCounter>uploadProgressMap.get(uploadId);
    asyncCounter.increment(progressAddNum);
    onProgress({percent: asyncCounter.getCount()})
    console.log(asyncCounter.getCount());

    // 判断是否所有分片上传完毕
    if (asyncCounter.getCount() >= 100 && res.data && res.data.url) {
      onProgress({percent: 100})
      doFinish(file, res, onFinish);
    }
  }).catch(err => {
    console.log(err);
    onError();
  }).finally(()=> uploadingCounter.increment(-1))
}

const fillFormData = (data) => {
  const formData = new FormData();
  // 填充表单
  Object.keys(data).forEach((key) => {
    formData.append(
        key,
        data[key]
    )
  })
  return formData;
}

const customRequest = async ({
                               file,
                               data,
                               headers,
                               withCredentials,
                               action,
                               onFinish,
                               onError,
                               onProgress
                             }: UploadCustomRequestOptions) => {

  await uploadingCounter.increment(1);

  // 构造请求数据
  let d: any = await onBeforeUpload({file: file, fileList: []});
  if (!d) {
    await uploadingCounter.increment(-1);
    onError();
    return;
  }

  // 需要上传文件本体
  if (d.exist !== 1) {
    // 做分片
    if (props.chunkSize > 0) {
      console.log("do chunk..")
      let f = (<UploadFileInfo>file).file as File;
      // 文件大小
      let fileSize = f.size;

      // 分片数量
      let chunkNum = Math.ceil(fileSize / props.chunkSize)

      let progressAddNum = Math.ceil(100 / chunkNum);

      // 初始化计数器
      uploadProgressMap.set(d.uploadId, new AsyncCounter());

      // 上传分片
      for (let i = 0; i < chunkNum; i++) {
        let start = i * props.chunkSize, end = Math.min(fileSize, start + props.chunkSize);

        // 切割文件
        let blob = f.slice(start, end);

        let formData;
        // 把信息藏在最后一个分片
        if (i === chunkNum - 1) {
          // 填充表单
          formData = fillFormData(d);
        } else {
          formData = new FormData();
          formData.append("uploadId", d.uploadId);
          formData.append("contentType", d.contentType);
          formData.append("exist", d.exist);
          formData.append("md5", d.md5);
          formData.append("name", d.name)
        }
        formData.append("chunks", chunkNum);
        formData.append("chunk", i + 1);
        formData.append("file", blob);
        // 上传分片
        uploadChunk(formData, onProgress, progressAddNum, file, onFinish, onError);
      }
    }
    uploadingCounter.increment(-1);
    return;
  }

  // 填充表单
  let formData = fillFormData(d);
  // 只需要上传文件相关信息，无需上传文件本体
  request.post(<string>props.uploadUrl, formData, {
    headers: {"Content-Type": 'application/x-www-form-urlencoded'},
    onUploadProgress: function (progressEvent) {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgress({percent: percentCompleted})
      console.log(`Upload Progress: ${percentCompleted}%`);
    }
  }).then(res => {
    console.log(res)
    onProgress({percent: 100})
    doFinish(file, res, onFinish);
  }).catch(err => {
    console.log('on error ==> ', err);

    (<UploadFileInfo>file).status = 'error';
    onError();
  }).finally(() => uploadingCounter.increment(-1));

}


const onDownload = (file: UploadFileInfo) => {
  notification.success({
    title: `下载成功：${file.name}`,
    duration: 888
  })
}

const onRemove = async (options: { file: UploadFileInfo, fileList: Array<UploadFileInfo> }): Promise<boolean> => {
  let file = options.file;
  let f = true;
  await deleteFile(<string>props.bucketName, file.name).catch(() => f = false)

  return f;
}

// const onPreview = (file: FileInfo) => {
//   dialog.create({
//     icon: undefined,
//     title: undefined,
//     content: h(NImage, {
//       src: file.url
//     })
//   })
//
// }



</script>

<style scoped>

</style>
