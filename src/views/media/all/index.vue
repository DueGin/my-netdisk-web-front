<template>
  <div class="app-container">
    <media-list
        :media-list="mediaList"
        @handle-delete="handleDeleteMedia"
        :upload-url="uploadUrl"
        @get-page="getPage"
    />
  </div>
</template>

<script setup lang="ts">
import {onActivated, ref} from 'vue'
import {deleteMedia, getMediaPage} from "@/apis/media/MediaApi.ts";
import MediaList from "@/components/Media/MediaList.vue";

onActivated(() => {
  console.log('activated mediaList')
})

const uploadUrl = import.meta.env.VITE_APP_BASE_API + '/media/upload'

// 媒体资源列表
let mediaParam = {
  size: 30,
  current: 1,
  onlyLookSelf: undefined
}
const mediaList = ref([])
const getPage = (isReload?: boolean, cb?) => {
  if (isReload) {
    mediaParam = {
      size: 30,
      current: 1,
      onlyLookSelf: undefined
    };
  }
  getMediaPage(mediaParam).then(res => {
    console.log('===>',res.data)
    if (res.data) {
      if (isReload) {
        mediaList.value = res.data.records;
      } else {
        mediaList.value = mediaList.value.concat(res.data.records);
      }
      mediaParam.current = res.data.current + 1;
      if (cb) {
        cb(mediaList.value.length, res.data.total);
      }
    }
  })

}


// 点击删除按钮
const handleDeleteMedia = (ids, cb: (resPromise: Promise<Result<any>>) => any) => {
  cb(deleteMedia(ids))
}

</script>

<style scoped>

</style>
