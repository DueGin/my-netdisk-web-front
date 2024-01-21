<template>
  <div class="add-group-form-ctn">
    <n-form :model="formData">
      <n-upload
          :default-file-list="fileList"
          list-type="image-card"
          action=""
          max="1"
          directory-dnd
      >
        <!--        todo 搞个minio存储头像-->
        上传组头像
      </n-upload>
      <n-form-item label="组资源名称" path="formData.groupName">
        <n-input v-model:value="formData.groupName" placeholder="名儿叫个啥？"/>
      </n-form-item>
      <n-form-item label="简介" path="formData.description">
        <n-input type="textarea" v-model:value="formData.description" placeholder="为啥想创建这么个组捏，简单说说呗"/>
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="createGroup">添加资源组</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {addGroup} from "@/apis/group/GroupApi.ts";
import {useNotification} from 'naive-ui'

const emits = defineEmits(['submitCallback']);

const notification = useNotification();

interface FormData {
  groupName: any,
  description: any,
  avatar: any,
}

const formData = reactive<FormData>({
  groupName: undefined,
  description: undefined,
  avatar: undefined
});

const changeGroup = (formData) => {
  console.log(formData)
}

const fileList = ref([])

// 创建组
const createGroup = () => {
  console.log(formData)
  console.log(fileList)

  addGroup(formData).then(res => {
    if (res.code === 200) {
      notification.success({
        title: "新增成功！",
        duration: 1000,
        keepAliveOnHover: true
      })

    }
  })

  emits('submitCallback');
}


</script>

<style scoped>

</style>
