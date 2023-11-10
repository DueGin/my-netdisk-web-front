<template>
  <div class="app-container">
    <n-tabs type="line" animated v-model:value="tabsValue" style="padding-left: .3rem;">
      <n-tab name="month">月</n-tab>
      <n-tab name="year">年</n-tab>
      <n-tab name="place">地点</n-tab>
      <n-tab name="role">人物</n-tab>
    </n-tabs>
    <div class="folder-ctn">
      <div v-for="f in folderList">
        <Folder
            :folderName="f.name"
            @clickFolder="clickFolder"
            @click="clickFolder(f.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Folder from "@/components/folder/Folder.vue";
import {getMediaListByClassifyId} from "@/apis/media/MediaRequest.ts";
import {getClassifyList} from "@/apis/media/ClassifyRequest.ts";

// 获取tabs列表
// 指定tabs默认选中项
const tabsValue = ref('month')
// tabsValue.value =


// 获取分类列表
const folderList = ref([])
const getList = () => {
  getClassifyList().then(res => {
    if (res.code === 200 && res.data) {
      folderList.value = res.data
    }
  })
}
getList()

// 点击folder
const clickFolder = (id) => {
  console.log('click folder')
  getMediaListByClassifyId(id).then(res => {
    console.log(res)
    if (res.code === 200 && res.data) {

    }
  })
}

</script>

<style scoped>
.app-container {
  padding: 0;
}
.folder-ctn{
  padding: 1rem;
}
</style>
