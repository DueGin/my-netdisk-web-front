<template>
  <div class="app-container">
    <div style="display: grid;grid-template-columns: 30% 70%;align-items: center;justify-items: center;">
      <n-avatar
          round
          size="large"
          style="cursor: pointer; width: 160px; height: 160px; border: 1px solid rgba(136,136,136,0.3);"
          :src="data.avatarUrl"
          @click="clickAvatar"
      >
      </n-avatar>
      <!--      <n-upload-->
      <!--          :action="uploadUrl"-->
      <!--          :max="1"-->
      <!--          :file-list="fileList"-->
      <!--          list-type="image-card"-->
      <!--          :headers="{Authorization: useMainStore().token}"-->
      <!--          @remove="onRemove"-->
      <!--          :key="uploadKey"-->
      <!--      />-->

      <n-pro-form
          :formFields="formFields"
          :formKey="formKey"
          v-model:formData="data"
          @handle-submit="handleUpdate"
          :is-show-reset-button="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NProForm from "@/components/n-pro-table/form/NProForm.vue";
import {h, ref} from "vue";
import FormItem from "@/components/n-pro-table/form/FormItem.ts";
import {getUserDetail, updateUser} from "@/apis/user/userApi.ts";
import {dialog, notification} from "@/utils/tip/TipUtil.ts";
import FileUpload from "@/components/fileUpload/FileUpload.vue";
import {useMainStore} from "@/store/store.ts";

const formKey = ref(0);
const formFields = ref<FormItem[]>([
  {
    prop: 'username',
    label: '用户名',
    formType: 'input',
    required: true
  },
  // {
  //   prop: 'phone',
  //   label: '手机号码',
  //   formType: 'other',
  //   formItemRender: () => h('div', {}, {default: () => '修改手机号，需要验证码'})
  // },
  // {
  //   prop: 'email',
  //   label: '邮箱',
  //   formType: 'other',
  //   formItemRender: () => h('div', {}, {default: () => '修改邮箱，需要验证码'})
  // }
]);

const data = ref<any>({});
const fileList = ref([]);
const getUserInfo = () => {
  getUserDetail().then(res => {
    if (res.data) {
      data.value = res.data;
      if (res.data.avatar) {
        let f = {
          id: Math.random() * 100,
          name: res.data.avatar,
          url: res.data.avatarUrl,
          status: 'finished',
        }
        fileList.value = [];
        fileList.value.push(f);
      }
    }
  })
}
getUserInfo();


const mainStore = useMainStore();

const handleUpdate = (data) => {
  updateUser(data).then(() => {
    mainStore.clearAll();
    mainStore.loadUser();
    getUserInfo();
    notification.success({
      title: '保存成功！',
      duration: 888
    })
  })
}

let uploadUrl = import.meta.env.VITE_APP_BASE_API + '/user/avatar/upload';

let avatarUploadDialog : any;
const clickAvatar = () => {
  avatarUploadDialog = dialog.create({
    icon: h(''),
    title: h(''),
    content: () => h(FileUpload, {
      uploadUrl: uploadUrl,
      isAnalysisExif: false,
      onFinish: (file) => {
        console.log(file)
        data.value.avatarUrl = file.url;
        data.value.avatar = file.name;
        mainStore.clearAll();
        mainStore.loadUser();
        setTimeout(() => {
          avatarUploadDialog.destroy();
        }, 300)
      }
    }),
  })
}

// const uploadKey = ref(0);

</script>

<style scoped>

</style>
