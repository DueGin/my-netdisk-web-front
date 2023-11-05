<template>
  <div class="app-container">
    <div class="media-tool-ctn">
      <n-button type="primary" @click="clickEdit">编辑</n-button>
      <n-button v-if="isShowCancelButton" type="primary" @click="clickCancel">取消</n-button>
    </div>
    <div class="media-container">
      <div v-for="item in mediaList" class="media-item" @click="isOpenChoose && chooseItem(item)">
        <n-image
            v-if="item.type === 'photo'"
            :src="item.src"
            object-fit="contain"
            style="border-radius: 0.5rem"
            :preview-disabled="isPreviewPhoto"
        />
        <VideoPlayer v-if="item.type === 'video'" :isUseDialog="isUseVideoDialog"
                     :src="item.src"
        />
<!--        <n-icon size="2rem" style="position: absolute; ">-->
<!--          <Icon icon="dashicons:yes-alt" color="#465e49" v-show="item.isChose" />-->
<!--        </n-icon>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import VideoPlayer from "@/components/videoPlayer/VideoPlayer.vue";

const mediaList = [
  {
    id: 1,
    type: 'photo',
    src: 'https://www.dmoe.cc/random.php'
  }, {
    id: 2,
    type: 'video',
    src: '../../src/assets/Window-2023-09-22-003340.mp4'
  }, {
    id: 3,
    type: 'photo',
    src: 'https://api.oick.cn/random/api.php'
  }, {
    id: 4,
    type: 'photo',
    src: 'https://api.r10086.com/%E6%A8%B1%E9%81%93%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87api%E6%8E%A5%E5%8F%A3.php?%E5%9B%BE%E7%89%87%E7%B3%BB%E5%88%97=%E5%88%80%E5%89%91%E7%A5%9E%E5%9F%9F%E6%A8%AA%E5%B1%8F%E7%B3%BB%E5%88%971'
  }, {
    id: 5,
    type: 'photo',
    src: 'https://img.xjh.me/random_img.php?return=302'
  }, {
    id: 6,
    type: 'photo',
    // src: 'https://image.anosu.top/pixiv/direct?r18=1' // r18
    src: 'https://img.moehu.org/pic.php?id=acghs'
  }, {
    id: 7,
    type: 'photo',
    src: 'http://www.98qy.com/sjbz/api.php'
  }, {
    id: 8,
    type: 'photo',
    src: 'https://api.r10086.com/%E6%A8%B1%E9%81%93%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87api%E6%8E%A5%E5%8F%A3.php?%E5%9B%BE%E7%89%87%E7%B3%BB%E5%88%97=Fate%E6%A8%AA%E5%B1%8F%E7%B3%BB%E5%88%971'
  }, {
    id: 9,
    type: 'photo',
    src: 'https://api.r10086.com/%E6%A8%B1%E9%81%93%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87api%E6%8E%A5%E5%8F%A3.php?%E8%87%AA%E9%80%82%E5%BA%94%E5%9B%BE%E7%89%87%E7%B3%BB%E5%88%97=Fate'
  }, {
    id: 10, // r18
    type: 'photo',
    src: 'https://api.r10086.com/%E6%A8%B1%E9%81%93%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87api%E6%8E%A5%E5%8F%A3.php?%E5%9B%BE%E7%89%87%E7%B3%BB%E5%88%97=Fate%E7%AB%96%E5%B1%8F%E7%B3%BB%E5%88%971'
  },
]

// const mediaList = ref([])


const isPreviewPhoto = ref(false)
const isShowCancelButton = ref(false)
const isUseVideoDialog = ref(true)
const isCanChose = ref(false)
const isOpenChoose = ref(false)
const choseList = []

const chooseItem = (item) => {
  console.log(item)
  choseList.push(item)
  item.isChose = true
}

const clickCancel = () => {
  // 不显示取消按钮
  isShowCancelButton.value = false
  // 关闭禁用预览图片
  isPreviewPhoto.value = false
  // 打开使用视频dialog
  isUseVideoDialog.value = false
  // 关闭选中媒体item样式
  isCanChose.value = false

  isOpenChoose.value = false
}

const clickEdit = () => {
  // 禁用预览图片
  isPreviewPhoto.value = true
  // 显示取消按钮
  isShowCancelButton.value = true
  // 关掉视频dialog
  isUseVideoDialog.value = false
  // 打开选中媒体item样式
  isCanChose.value = true

  isOpenChoose.value = true
}

</script>

<style scoped>
.chose-item {
  border: 1px solid blue;
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
}

.media-item:hover {
  border: 1px solid rgba(136, 136, 136, 0.74);
}
</style>
