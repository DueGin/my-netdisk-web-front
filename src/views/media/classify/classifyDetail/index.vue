<template>
  <div class="app-container">
    <MediaList
        :mediaList="list"
        @handleDelete="handleDelete"
        :uploadUrl="uploadUrl"
        :isShowBackButton="true"
        :back-to-path="backToPath"
        @get-page="getList"
        :reload-key="mediaReloadKey"
    />
  </div>
</template>

<script setup lang="ts">

import MediaList from "@/components/Media/MediaList.vue";
import {deleteMedia, getMediaPageByClassifyId} from "@/apis/media/MediaApi.ts";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
import {useMessage} from 'naive-ui'
import PageDTO from "@/model/page/PageDTO.ts";

const message = useMessage()

let route = useRoute()
const classifyId = ref("");
const type = ref("");
const backToPath = ref('');

const list = ref([])

const uploadUrl = import.meta.env.VITE_APP_BASE_API + '/media/upload'

// 获取某分类下的媒体列表
let page: PageDTO = {
  current: 1,
  size: 10
}

const resetPage = () => {
  page.current = 1;
}

const mediaReloadKey = ref(0);

const getList = (isReload?: boolean, cb?) => {
  if (isReload) {
    resetPage();
  }
  getMediaPageByClassifyId(page, type.value, classifyId.value).then(res => {
    if (res.code === 200 && res.data) {
      if (isReload) {
        list.value = res.data.records;
      } else {
        list.value = list.value.concat(res.data.records);
      }
      page.size = res.data.size;
      page.current = res.data.current + 1;
      if (cb) {
        cb(list.value.length, res.data.total);
      }
    }
  })
}

// 监听参数
watch(() => route.query, (from, to) => {
  if (from && from.classifyId) {
    console.log('==>', from)
    classifyId.value = <string>from.classifyId;
    type.value = <string>from.type;
    backToPath.value = <string>from.backToPath;
    page.size = 30;
    page.current = 1;
    mediaReloadKey.value++;
  }
}, {immediate: true})

// 处理删除
const handleDelete = (ids: any[], cb: (resPromise: Promise<Result<any>>) => any) => {
  cb(deleteMedia(ids))
}


</script>

<style scoped>

</style>
