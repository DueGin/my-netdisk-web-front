<template>
  <n-upload
      class="upload-ctn"
      multiple
      directory-dnd
      :action="uploadUrl"
      :max="30"
      @finish="onFinish"
      :headers="{Authorization: useMainStore().token}"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <Icon icon="ion:archive-outline"/>
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        点击或者拖动文件到该区域来上传
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
      </n-p>
    </n-upload-dragger>
  </n-upload>
</template>

<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {useMainStore} from "@/store/store.ts";

const props = defineProps({
  uploadUrl: {
    type: String,
    default: import.meta.env.VITE_APP_BASE_API + '/upload'
  },
  uploadFile: {
    type: Array,
    default: []
  }
});

const emits = defineEmits(['on-finish']);

const onFinish = (file) => {
  console.log(file)
  emits('on-finish')
}

</script>

<style scoped>

</style>
