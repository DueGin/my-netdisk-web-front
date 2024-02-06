<template>
  <n-upload
      class="upload-ctn"
      :multiple="isMultiple"
      directory-dnd
      :action="uploadUrl"
      :max="30"
      :data="data"
      :headers="{Authorization: useMainStore().token}"
      @before-upload="onBeforeUpload"
      @finish="onFinish"
      show-download-button
      @download="onDownload"
      show-remove-button
      @remove="onRemove"
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
import {UploadFileInfo} from "naive-ui";
import {ref} from 'vue';
import {getExif} from "@/utils/ExifUtil.ts";
import ExifDTO from "@/model/exif/ExifDTO.ts";
import {timestampToDateTime} from "@/utils/dateTime/DateTimeUtil.ts";
import {useGeoStore} from "@/store/geoStore/GeoStore.ts";
import {notification} from "@/utils/tip/TipUtil.ts";
import {deleteFile} from "@/apis/file/FileApi.ts";

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
    default: 'system'
  }
});

const emits = defineEmits(['finish']);

const data = ref({});
const onBeforeUpload = async (options: {
  file: UploadFileInfo,
  fileList: UploadFileInfo[]
}): Promise<boolean | void> => {
  let nFile = options.file;
  console.log("before")
  console.log(nFile);

  if (!props.isAnalysisExif) {
    return true;
  }

  await getExif(nFile.file).then(async (dto: ExifDTO) => {
    console.log(dto)
    let v: ExifDTO = {
      originalDateTime: "",
      mimeType: ""
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
        if (res) {
          console.log(res.lng, typeof res.lng)
          v.longitude = res.lng;
          v.latitude = res.lat;
        }
      })
    }

    data.value = v;
  })

  return true;
}

const onFinish = ({file, event}: {
  file: UploadFileInfo
  event?: ProgressEvent
}): UploadFileInfo | undefined => {
  console.log(file, event)
  let resStr = (<XMLHttpRequest>event.target).response;
  let res: Result<any> = JSON.parse(resStr);

  // 上传不成功，修改上传组件状态
  if (res.code !== 200 || !res.data) {
    file.status = 'error';
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

  // 执行自定义回调
  emits('finish', file);
  return file
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

// const customRequest = ({
//                          file,
//                          data,
//                          headers,
//                          withCredentials,
//                          action,
//                          onFinish,
//                          onError,
//                          onProgress
//                        }: UploadCustomRequestOptions) => {
//   const formData = new FormData()
//   if (data) {
//     Object.keys(data).forEach((key) => {
//       formData.append(
//           key,
//           data[key as keyof UploadCustomRequestOptions['data']]
//       )
//     })
//   }
//   formData.append(file.name, file.file as File)
//   request.post(action as string, formData, {
//         headers: headers,
//       })
//       .then((res) => {
//         if(onFinish){
//           file.url = res.data.url;
//           file.name = res.data.fileName;
//           onFinish()
//         }
//       })
//       .catch((error) => {
//         if(onError) {
//           onError()
//         }
//       })
// }


</script>

<style scoped>

</style>
