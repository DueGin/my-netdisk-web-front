<template>
  <div class="app-container" @scroll="handleScroll">
    <MediaList
        :mediaList="mediaList"
        @handleDelete="handleDeleteMedia"
        :uploadUrl="uploadUrl"
        @uploadCb="uploadCallback"
        @scroll="handleScroll"
        @get-page="getPage"
    />
  </div>
</template>

<script setup lang="ts">
import {onActivated, onMounted, ref} from 'vue'
import {deleteMedia, getMediaPage} from "@/apis/media/MediaApi.ts";
import MediaList from "@/components/Media/MediaList.vue";

onActivated(() => {
  console.log('activated mediaList')
})

const uploadUrl = import.meta.env.VITE_APP_BASE_API + '/media/upload'

// 媒体资源列表
let mediaParam = {
  pageSize: 30,
  pageNumber: 1,
  onlyLookSelf: undefined
}
const mediaList = ref([])
const getPage = (cb?) => {
  getMediaPage(mediaParam).then(res => {
    if (res.data) {
      mediaList.value = mediaList.value.concat(res.data.records);
      mediaParam.pageNumber++;
    }
    if(cb) {
      cb(mediaList.value.length)
    }
  })

}
getPage()

const uploadCallback = () => {
  mediaParam = {
    pageSize: 30,
    pageNumber: 1,
    onlyLookSelf: undefined
  };
  mediaList.value = []
  getPage()
}

const isPreviewPhoto = ref(false)
const isShowCancelButton = ref(false)
const isUseVideoDialog = ref(true)
const isOpenSelect = ref(false)
const isAlwaysSelectAll = ref(false)
// 选中的图片map
const selectMap = new Map()


// 点击删除按钮
const handleDeleteMedia = (ids) => {
  deleteMedia(ids).then(res => {
    if (res.code === 200) {
      console.log('delete success')
      // 关闭选择
      clickCancel()
      // todo 删除指定item
      for (let i = 0; i < mediaList.value.length; i++) {
        let v = mediaList.value[i];
        for (let j = 0; j < ids.length; j++) {
          if (v.id === ids[j]) {

          }
        }
      }
    }
  })
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
  // 清空选中map
  clearSelectPhoto()
}

const handleScroll = (e) => {
  console.log(e)

}
</script>

<style scoped>

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
