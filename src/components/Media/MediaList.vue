<template>
  <div>
    <div class="media-tool-ctn">
      <div class="tool-left">
        <n-button @click="router.push({path:backToPath})" v-if="isShowBackButton">返回</n-button>
      </div>
      <div class="tool-right">
        <n-icon size="1.5rem" @click="clickReload" style="cursor:pointer;">
          <Icon icon="ci:arrow-reload-02"/>
        </n-icon>
        <div v-show="isShowCancelButton">
          <slot name="select-action-tool" :selectIds="selectIds" :clickCancel="clickCancel"/>
        </div>
        <n-button
            v-if="isShowUploadButton && showUploadButton"
            :render-icon="()=>renderIcon('ion:cloud-upload-outline')"
            @click="clickUpload"
        >
          上传
        </n-button>
        <n-button
            type="primary"
            @click="clickDelete"
            :render-icon="()=>renderIcon('mi:delete')"
            v-show="isShowCancelButton"
            :loading="removeButtonLoading"
            :disabled="selectMap.size===0"
        >
          删除
        </n-button>
        <n-button
            v-show="isShowCancelButton && !isAlwaysSelectAll"
            type="primary"
            @click="selectAll"
            :render-icon="()=>renderIcon('fluent:select-all-on-24-filled')"
        >
          全选
        </n-button>
        <n-button
            v-show="isShowCancelButton && isAlwaysSelectAll"
            type="primary"
            @click="selectAll"
            :render-icon="()=>renderIcon('fluent:select-all-on-24-regular')"
        >
          取消全选
        </n-button>
        <n-button
            v-show="isShowCancelButton"
            type="primary"
            @click="clickCancel"
            :render-icon="()=>renderIcon('mdi:cancel')"
        >
          取消
        </n-button>
        <n-button
            v-show="!isShowCancelButton"
            type="primary"
            @click="clickEdit"
            :render-icon="()=>renderIcon('mingcute:edit-line')"
        >
          选择
        </n-button>
      </div>
    </div>
    <div v-if="list && list.length!==0" class="media-container">
      <div
          v-for="(item, index) in list"
          :class="['media-item',{'cur-poi':isShowCancelButton}]"
          @click="isOpenSelect && selectItem(item, index)"
          :key="item.fileName"
      >
        <n-image
            @contextmenu="showRightMenu"
            v-if="!item.mimeType || (item.mimeType && item.mimeType.includes('image'))"
            :src="item.url"
            width="100%"
            height="100%"
            object-fit="cover"
            style="border-radius: 0.5rem;height: 100%; width: 100%;"
            :preview-disabled="isPreviewPhoto"
        />
<!--            :preview-src="downloadMedia(item.fileName)"-->
        <VideoPlayer
            v-else-if="item.mimeType.includes('video')"
            :isUseDialog="isUseVideoDialog"
            :src="item.url"
        />
        <n-icon v-show="item.isSelected" size="2rem" class="select-icon">
          <Icon icon="zondicons:checkmark-outline" color="#00ff66"/>
        </n-icon>
      </div>
    </div>
    <div v-else style="width: 100%;height: 100px;display:flex;align-items: center;justify-content: center">
      {{ emptyText && emptyText.length !== 0 ? emptyText : '暂无照片，快去上传吧！' }}
    </div>
    <div
        v-if="list && list.length!==0"
        style="display: flex;align-items: center;justify-content: center; margin-top: 2rem; margin-bottom: 1rem;"
    >
      <n-button
          :disabled="!hasMore"
          tertiary
          style="width: 30%"
          @click="handleClickMoreButton(false)"
          :loading="moreButtonLoading"
      >
        {{ hasMore ? '加载更多' : '没有更多' }}
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, h, ref, watch} from 'vue'
import VideoPlayer from "@/components/videoPlayer/VideoPlayer.vue";
import {Icon} from "@iconify/vue";
import {renderIcon} from "@/utils/render/IconRender.ts";
import {dialog, notification} from "@/utils/tip/TipUtil.ts";
import FileUpload from "@/components/fileUpload/FileUpload.vue";
import router from "@/router";

const props = defineProps({
  uploadUrl: {
    type: String,
    default: import.meta.env.VITE_APP_BASE_API + '/upload'
  },
  // 媒体列表
  mediaList: {
    type: Array,
    default: []
  },
  selectMap: {
    type: Map,
    default: new Map(),
  },
  isShowBackButton: {
    type: Boolean,
    default: false
  },
  reloadKey: {
    type: Number,
    default: 0
  },
  isShowUploadButton: {
    type: Boolean,
    default: true
  },
  emptyText: {
    type: String,
    default: undefined
  },
  backToPath: {
    type: String,
    default: '/media/home'
  }
})

const list = ref(props.mediaList);
watch(() => props.mediaList, () => {
  list.value = props.mediaList;
})

console.log("backkk", props.backToPath)

const emits = defineEmits<{
  (e: "getPage", isReload: boolean, cb: (nowSize: number, total: number) => any),
  (e: 'handleDelete', ids: any[], cb: (resPromise: Promise<Result<any>>) => any),
  (e: 'uploadCb'),
  (e: 'update:modelValue', obj: any),
  (e: 'reload')
}>()

// 获取更多按钮
const moreButtonLoading = ref(false);
const hasMore = ref(true);
const handleClickMoreButton = async (isReload: boolean, cb?) => {
  moreButtonLoading.value = true;
  console.log(list)
  await emits('getPage', isReload, (nowSize: number, total: number) => {
    if (nowSize >= total) {
      hasMore.value = false;
    }
    // 获取完分页回调
    if (cb) {
      cb()
    }
  });

  moreButtonLoading.value = false;
}
// 获取分页
handleClickMoreButton(false);

const clickReload = async () => {
  await handleClickMoreButton(true, () => {
    notification.success({
      title: '重新加载成功！',
      duration: 888
    })
    hasMore.value = true;
  });
}

// 监听重新加载key
watch(() => props.reloadKey, () => {
  console.log("reload media list")
  handleClickMoreButton(true);
})

const showUploadButton = ref(true)
const isPreviewPhoto = ref(false)
const isShowCancelButton = ref(false)
const isUseVideoDialog = ref(true)
const isOpenSelect = ref(false)
const isAlwaysSelectAll = ref(false)

// 选中的图片map
const selectMap = props.selectMap ? props.selectMap : new Map();
computed({
  get() {
    return new Proxy(props.selectMap, {
      set(obj, name, val) {
        emits("update:modelValue", {
          ...obj,
          [name]: val
        })
        return true
      }
    })
  },
  set(value) {
    emits("update:modelValue", {
      ...props.selectMap,
      keyword: value
    })
  }
})


// 显示右键菜单
const showRightMenu = (e) => {
  console.log(e)
}

// 全选
const selectAll = () => {
  if (isAlwaysSelectAll.value) {
    console.log('cancel select all')
    clearSelectPhoto();
  } else {
    console.log('select all')
    list.value?.forEach(t => {
      t.isSelected = true
      selectMap.set(t.id, t)
    })

    isAlwaysSelectAll.value = true
  }
}

const selectIds = ref([]);
const handleSelectIds = () => {
  let ids = [];
  selectMap.forEach(t => {
    ids.push(t.id);
  })
  selectIds.value = ids;
}

// 选择图片
const selectItem = (item, idx) => {
  console.log(item)
  if (selectMap.has(item.id)) {
    console.log('had')
    item.isSelected = false
    selectMap.delete(item.id)
  } else {
    console.log('no had')
    item.isSelected = true;
    selectMap.set(item.id, {...item, index: idx})
  }
  handleSelectIds()
}

// 点击删除按钮
const removeButtonLoading = ref(false);
const clickDelete = () => {
  let ids = [];
  let indexs: number[] = [];
  selectMap.forEach(t => {
    ids.push(t.id);
    indexs.push(t.index);
  })
  dialog.create({
    icon: h('div', {}, {default: () => '🚮'}),
    title: '确定删除吗？',
    content: '他们将去往垃圾篓🗑️，帮你保管30天先',
    positiveText: '😑早就想删了',
    onPositiveClick: async () => {
      removeButtonLoading.value = true
      await emits('handleDelete', ids, (resPromise: Promise<Result<any>>) => {
        resPromise
            .then(res => {
              notification.success({
                title: '删除成功！',
                content: res.msg && res.msg !== '' ? res.msg : undefined,
                duration: 888
              })

              // 索引倒序删除
              indexs.sort((i1, i2) => {
                if (i1 === i2) {
                  return 0;
                }
                return i2 > i1 ? 1 : -1;
              })
              // 手动删掉
              indexs.forEach(idx => list.value?.splice(idx, 1));

              clickCancel();
            })
            .catch(err => {
              console.error(err)
              notification.error({
                title: '删除失败！',
                content: err.msg,
                duration: 1288
              })
            })
            .finally(() => removeButtonLoading.value = false)
      });

    },
    negativeText: '🤔容我再想想',
  })

  // deleteMedia(ids).then(res => {
  //   if (res.code === 200) {
  //     console.log('delete success')
  //     // 关闭选择
  //     clickCancel()
  //     // 执行cb
  //
  //   }
  // })
}

// 清空选择的图片
const clearSelectPhoto = () => {
  list.value?.forEach(t => {
    t.isSelected = false
  })

  selectMap.clear()
  isAlwaysSelectAll.value = false
  handleSelectIds();
}

// 点击取消按钮
const clickCancel = () => {
  // 不显示取消按钮
  isShowCancelButton.value = false
  // 关闭禁用预览图片
  isPreviewPhoto.value = false
  // 打开使用视频dialog
  isUseVideoDialog.value = false
  // 关闭点击事件
  isOpenSelect.value = false
  showUploadButton.value = true;
  // 清空选中map
  clearSelectPhoto()
}

// 点击编辑按钮
const clickEdit = () => {
  // 禁用预览图片
  isPreviewPhoto.value = true
  // 显示取消按钮
  isShowCancelButton.value = true
  // 关掉视频dialog
  isUseVideoDialog.value = false
  showUploadButton.value = false;
  // 打开点击事件
  isOpenSelect.value = true
}

// 点击上传按钮
const clickUpload = () => {
  dialog.create({
    icon: () => h('div'),
    title: undefined,
    content: () => h(FileUpload, {
      uploadUrl: props.uploadUrl,
      isAnalysisExif: true,
      isMultiple: true,
      maskClosable: false
      // ['on-finish']: () => {
      //   emits('uploadCb')
      // }
    }),
    onClose: () => {
      emits('uploadCb')
      // 重新获取列表
      handleClickMoreButton(true);
    }
  })
}


const handlePreviewPhoto=(item)=>{
  if(item.previewUrl){

  }
}

</script>

<style scoped>
.media-tool-ctn {
  display: flex;
  margin-bottom: 1rem;
}

.select-icon {
  position: absolute;
  right: -0.3rem;
  bottom: -0.3rem;
}

.tool-left {
  width: 50%;
  display: flex;
  column-gap: 1rem;
  justify-content: flex-start;
}

.tool-right {
  width: 50%;
  display: flex;
  column-gap: 1rem;
  justify-content: flex-end;
  align-items: center;
}

.media-container :deep(img) {
  width: 100%;
  height: 100%;
}

.media-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.media-item {
  border-radius: 0.5rem;
  overflow: hidden;
  width: 12rem;
  height: 8rem;
  box-sizing: border-box;
  transition: all 1s;
  display: flex;
  align-items: center;
  position: relative;
}

.media-item:hover {
  border: 1px solid rgba(136, 136, 136, 0.74);
}
</style>
