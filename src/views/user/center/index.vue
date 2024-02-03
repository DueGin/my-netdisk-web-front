<template>
  <div class="app-container">
    <div style="display: grid;grid-template-columns: 30% 70%;align-items: center;justify-items: center;">
      <!--      <n-icon-->
      <!--          size="5rem"-->
      <!--          style="cursor: pointer; border: 1px solid rgba(136,136,136,0.3);border-radius: 100%"-->
      <!--          :src="data.avatarUrl"-->
      <!--          @click="clickAvatar"-->
      <!--      >-->
      <!--      </n-icon>-->
      <n-upload
          action=""
          :default-file-list="fileList"
          list-type="image-card"

      />

      <n-pro-form
          :formFields="formFields"
          :formKey="formKey"
          v-model:formData="data"
          @handle-submit="handleUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NProForm from "@/components/n-pro-table/form/NProForm.vue";
import {h, ref} from "vue";
import FormItem from "@/components/n-pro-table/form/FormItem.ts";
import {getUserDetail, updateUser} from "@/apis/user/userApi.ts";
import {dialog} from "@/utils/tip/TipUtil.ts";
import FileUpload from "@/components/fileUpload/FileUpload.vue";

const formKey = ref(0);
const formFields = ref<FormItem[]>([
  {
    prop: 'username',
    label: '用户名',
    formType: 'input',
    required: true
  },
  {
    prop: 'phone',
    label: '手机号码',
    formType: 'other',
    formItemRender: () => h('div', {}, {default: () => '修改手机号，需要验证码'})
  },
  {
    prop: 'email',
    label: '邮箱',
    formType: 'other',
    formItemRender: () => h('div', {}, {default: () => '修改邮箱，需要验证码'})
  }
]);

const data = ref({});
const fileList = ref([]);
const getUserInfo = () => {
  getUserDetail().then(res => {
    if (res.data) {
      data.value = res.data;
      let f = {
        id: Math.random() * 100,
        name: res.data.avatar,
        url: res.data.avatarUrl,
        status: 'finished',
      }
      fileList.value = [];
      fileList.value.push(f);
    }
  })
}

const handleUpdate = (data) => {
  updateUser(data).then(() => {
    getUserInfo();
  })
}

let uploadUrl = import.meta.env.VITE_APP_BASE_API + '/user/upload';

const clickAvatar = () => {
  dialog.create({
    icon: h(''),
    title: h(''),
    content: () => h(FileUpload, {
      uploadUrl: uploadUrl
    }),
    onClose: () => {
      // 只重新获取头像
    }
  })
}



</script>

<style scoped>

</style>
