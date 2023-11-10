<template>
  <div class="app-container">
    <MediaList :mediaList="mediaList" @handleDelete="handleDeleteMedia"/>
  </div>
</template>

<script setup lang="ts">
import {onActivated, ref} from 'vue'
import {deleteMedia, getMediaList} from "@/apis/media/MediaRequest.ts";
import MediaList from "@/components/Media/MediaList.vue";

onActivated(() => {
  console.log('activated mediaList')
})

// 媒体资源列表
const mediaList = ref([])
const getList = () => {
  getMediaList().then(res => {
    if (res.code === 200 && res.data) {
      mediaList.value = res.data
    }
  })
}
getList()


const isPreviewPhoto = ref(false)
const isShowCancelButton = ref(false)
const isUseVideoDialog = ref(true)
const isOpenSelect = ref(false)
const isAlwaysSelectAll = ref(false)
// 选中的图片map
const selectMap = new Map()

const showRightMenu = (e) => {
  console.log(e)
}

// 全选
const selectAll = () => {
  if (isAlwaysSelectAll.value) {
    console.log('cancel select all')
    mediaList.value.forEach(t => {
      t.isSelected = false
    })

    selectMap.clear()
    isAlwaysSelectAll.value = false
  } else {
    console.log('select all')
    mediaList.value.forEach(t => {
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
const handleDeleteMedia = (ids) => {
  // let ids = []
  // selectMap.forEach(t => ids.push(t.id))
  deleteMedia(ids).then(res => {
    if (res.code === 200) {
      console.log('delete success')
      // 关闭选择
      clickCancel()
      // 重新获取list
      getList()
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

// 点击编辑按钮
const clickEdit = () => {
  // 禁用预览图片
  isPreviewPhoto.value = true
  // 显示取消按钮
  isShowCancelButton.value = true
  // 关掉视频dialog
  isUseVideoDialog.value = false

  // 打开点击事件
  isOpenSelect.value = true
}

</script>

<style scoped>
.select-icon {
  position: absolute;
  right: -0.3rem;
  bottom: -0.3rem;
}

.cur-poi {
  cursor: pointer;
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
