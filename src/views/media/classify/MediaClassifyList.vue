<template>
  <div class="app-container">
    <MediaList
        :mediaList="list"
        @handleDelete="handleDelete"
        :uploadUrl="uploadUrl"
        v-model:selectMap="selectMap"
        :isShowBackButton="true"
    />
  </div>
</template>

<script setup lang="ts">

import MediaList from "@/components/Media/MediaList.vue";
import {deleteMedia, getMediaListByClassifyId} from "@/apis/media/MediaApi.ts";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
import {useMessage} from 'naive-ui'

const message = useMessage()

let route = useRoute()
const classifyId = ref("");
const type = ref("");

const list = ref([])

const uploadUrl = import.meta.env.VITE_APP_BASE_API + '/media/upload'

// 获取某分类下的媒体列表
const getList = () => {
  console.log(classifyId.value)
  getMediaListByClassifyId(type.value, classifyId.value).then(res => {
    console.log(res)
    if (res.code === 200 && res.data) {
      list.value = res.data
    }
  })
}
// 监听参数
watch(() => route.query, (from, to) => {
  if(from && from.classifyId) {
    console.log('==>', from)
    classifyId.value = <string>from.classifyId;
    type.value = <string>from.type;
    getList()
  }
}, {immediate: true})


const selectMap = ref(new Map())

// 处理删除
const handleDelete = () => {
  let ids = []
  selectMap.value.forEach((v, k) => {
    ids.push(k)
  })
  deleteMedia(ids).then(res => {
    console.log(res)
    if (res.code === 200) {
      console.log('success')
      message.success('删除成功')
      // 重新获取列表
      getList()
    }
  })
}


</script>

<style scoped>

</style>
