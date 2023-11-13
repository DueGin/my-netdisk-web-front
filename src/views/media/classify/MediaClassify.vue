<template>
  <div class="app-container">
    <n-tabs type="line" animated v-model:value="tabsValue" style="padding-left: .3rem;" @update:value="getList">
      <n-tab :name="MediaClassifyConstant.MONTH">月</n-tab>
      <n-tab :name="MediaClassifyConstant.YEAR">年</n-tab>
      <n-tab :name="MediaClassifyConstant.PLACE">地点</n-tab>
      <n-tab :name="MediaClassifyConstant.CHARACTER">人物</n-tab>
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
import {getClassifyList} from "@/apis/media/ClassifyRequest.ts";
import router from "@/router";
import {MediaClassifyConstant} from "@/apis/media/MediaConstant.ts";

// 获取tabs列表
// 指定tabs默认选中项
const tabsValue = ref(MediaClassifyConstant.MONTH)

// 获取分类列表
const folderList = ref([])
const getList = () => {
  getClassifyList(tabsValue.value).then(res => {
    console.log(res)
    if (res.code === 200 && res.data) {
      folderList.value = res.data
    }
  })
}
getList()

// 点击folder
const clickFolder = (id) => {
  console.log('click folder')
  router.push({
    path: '/media/classify/list',
    query: {
      classifyId: id
    }
  })
}

</script>

<style scoped>
.app-container {
  padding: 0;
}

.folder-ctn {
  padding: 1rem;
}
</style>
