<template>
  <div class="app-container">
    <n-tabs type="line" animated v-model:value="tabsValue" style="padding-left: .3rem;" @update:value="getList">
      <n-tab :name="MediaClassifyConstant.YEAR">年</n-tab>
      <n-tab :name="MediaClassifyConstant.MONTH">月</n-tab>
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
import {getClassifyList} from "@/apis/media/ClassifyApi.ts";
import router from "@/router";
import {MediaClassifyConstant} from "@/constants/MediaConstant.ts";

// 获取tabs列表
// 指定tabs默认选中项
const tabsValue = ref(MediaClassifyConstant.YEAR)

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
  console.log(tabsValue.value, id);
  router.push({
    path: '/media/classify/detail',
    query: {
      classifyId: id,
      type: tabsValue.value,
      backToPath: '/media/classify/date'
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
