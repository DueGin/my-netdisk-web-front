<template>
  <div class="media-tool-ctn">

    <n-button :render-icon="renderIcon('ion:cloud-upload-outline')" @click="clickUpload">上传</n-button>

    <n-button
        type="primary"
        @click="clickDelete"
        :render-icon="renderIcon('mi:delete')"
        v-show="isShowCancelButton"
    >
      删除
    </n-button>
    <n-button
        v-show="isShowCancelButton && !isAlwaysSelectAll"
        type="primary"
        @click="selectAll"
        :render-icon="renderIcon('fluent:select-all-on-24-filled')"
    >
      全选
    </n-button>
    <n-button
        v-show="isShowCancelButton && isAlwaysSelectAll"
        type="primary"
        @click="selectAll"
        :render-icon="renderIcon('fluent:select-all-on-24-regular')"
    >
      取消全选
    </n-button>
    <n-button
        v-show="isShowCancelButton"
        type="primary"
        @click="clickCancel"
        :render-icon="renderIcon('mdi:cancel')"
    >
      取消
    </n-button>
    <n-button
        v-show="!isShowCancelButton"
        type="primary"
        @click="clickEdit"
        :render-icon="renderIcon('mingcute:edit-line')"
    >
      选择
    </n-button>
  </div>
  <div class="media-container" v-if="mediaList && mediaList.length!==0">
    <div
        v-for="item in mediaList"
        :class="['media-item',{'cur-poi':isShowCancelButton}]"
        @click="isOpenSelect && selectItem(item)"
    >
      <n-image
          @contextmenu="showRightMenu"
          v-if="item.mimeType.includes('image')"
          :src="item.url"
          object-fit="contain"
          style="border-radius: 0.5rem"
          :preview-disabled="isPreviewPhoto"
      />
      <VideoPlayer
          v-if="item.mimeType.includes('video')"
          :isUseDialog="isUseVideoDialog"
          :src="item.url"
      />
      <n-icon v-if="item.isSelected" size="2rem" class="select-icon">
        <Icon icon="zondicons:checkmark-outline" color="#758f69"/>
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, h} from 'vue'
import VideoPlayer from "@/components/videoPlayer/VideoPlayer.vue";
import {Icon} from "@iconify/vue";
import {renderIcon} from "@/utils/render/IconRender.ts";
import {deleteMedia} from "@/apis/media/MediaRequest.ts";
import {useMainStore} from "@/store/store.ts";
import {dialog} from "@/utils/tip/TipUtil.ts";
import FileUpload from "@/components/fileUpload/FileUpload.vue";

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
  }
})

const emits = defineEmits(['handleDelete', 'uploadCb'])


const isShowUploadButton = ref(true)
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
    props.mediaList?.forEach(t => {
      t.isSelected = false
    })

    selectMap.clear()
    isAlwaysSelectAll.value = false
  } else {
    console.log('select all')
    props.mediaList?.forEach(t => {
      t.isSelected = true
      selectMap.set(t.id, t)
    })

    isAlwaysSelectAll.value = true
  }
}

// 选择图片
const selectItem = (item) => {
  console.log(item)
  if (selectMap.has(item.id)) {
    console.log('had')
    selectMap.delete(item.id)
    item.isSelected = false
  } else {
    console.log('no had')
    selectMap.set(item.id, item)
    item.isSelected = true
  }
  console.log(item)
}

// 点击删除按钮
const clickDelete = () => {
  let ids = []
  selectMap.forEach(t => ids.push(t.id))
  emits('handleDelete', ids)
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
  for (let value of selectMap.values()) {
    value.isSelected = false
  }
  isAlwaysSelectAll.value = false
  selectMap.clear()
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
  isShowUploadButton.value = true;
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
  isShowUploadButton.value = false;
  // 打开点击事件
  isOpenSelect.value = true
}

// 点击上传按钮
const clickUpload = () => {
  dialog.create({
    icon: h(""),
    title: h(""),
    content: () => h(FileUpload, {
      uploadUrl: props.uploadUrl,
      // ['on-finish']: ()=>{
      //   emits('uploadCb')
      // }
    }),
    onClose:()=>{
      emits('uploadCb')
    }
  })
}

</script>

<style scoped>
.select-icon {
  position: absolute;
  right: -0.3rem;
  bottom: -0.3rem;
}

.media-tool-ctn {
  display: flex;
  column-gap: 1rem;
  justify-content: flex-end;
  margin-bottom: 1rem;
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
