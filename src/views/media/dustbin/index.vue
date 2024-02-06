<template>
  <div class="app-container">
    <MediaList
        :media-list="dustbinList"
        @handleDelete="handleDeleteDustbin"
        @get-page="getPage"
        :is-show-upload-button="false"
        empty-text="🚮 暂无垃圾篓相片"
    />
  </div>
</template>

<script setup lang="ts">
import {onActivated, ref} from 'vue'
import MediaList from "@/components/Media/MediaList.vue";
import {getDustbinPage, removeDustbin} from "@/apis/media/DustbinApi.ts";
import PageDTO from "@/model/page/PageDTO.ts";

onActivated(() => {
  console.log('activated dustbinList')
})

// 媒体资源列表
let page: PageDTO = {
  size: 30,
  current: 1,
}

const resetPage = () => {
  page.current = 1;
}

const dustbinList = ref([])
const getPage = (isReload?: boolean, cb?) => {
  if (isReload) {
    resetPage();
  }
  getDustbinPage(page).then(res => {
    if (res.data) {
      if (isReload) {
        dustbinList.value = res.data.records;
      } else {
        dustbinList.value = dustbinList.value.concat(res.data.records);
      }
      page.current = res.data.current + 1;
      if (cb) {
        cb(dustbinList.value.length, res.data.total)
      }
    }
  })

}


// 点击删除按钮
const handleDeleteDustbin = (ids: any[], cb: (resPromise: Promise<Result<any>>) => any) => {
  cb(removeDustbin(ids))
}

</script>

<style scoped>

</style>
