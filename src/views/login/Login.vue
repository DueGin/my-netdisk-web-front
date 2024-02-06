<template>
  <div class="app-container">
    <div class="login-form-container">
      <n-form
          :model="formState"
          name="normal_login"
          class="login-form"
          label-placement="left"
          label-width="65px"
          size="large"
      >
        <n-form-item label="用户名" name="username">
          <n-input v-model:value="formState.username" clearable>
            <template #prefix>
              <icon icon="ant-design:user-outlined"/>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item label="密码" name="password">
          <n-input type="password" v-model:value="formState.password" clearable>
            <template #prefix>
              <icon icon="ant-design:lock-outlined"/>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item v-if="isRegister" label="确认密码" name="confirmPassword">
          <n-input type="password" v-model:value="formState.confirmPassword" clearable>
            <template #prefix>
              <icon icon="ant-design:lock-outlined"/>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item label="验证码" name="code">
          <n-input v-model:value="formState.verifyCode" placeholder="" clearable>
            <template #prefix>
              <icon icon="ant-design:lock-outlined"/>
            </template>
          </n-input>
          <n-image style="cursor: pointer;" :src="verifyCodeUrl" @click="getCode" preview-disabled/>
        </n-form-item>

        <n-form-item class="remember-me-item" name="remember" no-style>
          <div v-if="!isRegister" style="display: flex; margin: 0 1rem;justify-content: space-between; width: 100%;">
            <n-checkbox v-model:checked="formState.rememberMe">记住密码</n-checkbox>
            <n-button @click="clickForgetPassword" :focusable="false" text>忘记密码？</n-button>
          </div>
        </n-form-item>

        <div
            style="display: flex; justify-content: center; column-gap: 1rem;align-items: center;margin-top: 1rem; position: relative">
          <n-button
              :disabled="disabled"
              type="primary"
              html-type="submit"
              class="login-form-button"
              style="width: 30%"
              @click="isRegister ? handleRegister(): loginHandle()"
          >
            {{ isRegister ? '注册' : '登录' }}
          </n-button>
          <n-button style="position: absolute; right: 10px;" @click="isRegister=!isRegister" text :focusable="false">
            现在{{ isRegister ? '登录' : '注册' }}！
          </n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from 'vue';
import {Icon} from "@iconify/vue";
import {login, register} from '@/apis/user/userApi.ts'
import {getVerifyCode} from "@/apis/verifyCode/verifyCodeRequest.ts";
import router from "@/router";
import {useMainStore} from "@/store/store.ts";
import {useMessage} from 'naive-ui';
import {notification} from "@/utils/tip/TipUtil.ts";
import {addDynamicMenuAndRoutes} from "@/utils/router/RouterUtil.ts";
import {useMenuStore} from "@/store/menuStore/MenuStore.ts";

const message = useMessage();

// 验证码
const verifyCodeUrl = ref("");
const getCode = () => {
  getVerifyCode().then(res => {
    console.log(res)
    formState.uuid = <string>res.data?.uuid;
    verifyCodeUrl.value = <string>res.data?.img;
  })
}
getCode();

const formState = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  uuid: '',
  verifyCode: '',
  rememberMe: false,
});

const rememberMeLocalStorageKey = 'login'
// 获取remember me
const getRememberMe = () => {
  let v = localStorage.getItem(rememberMeLocalStorageKey)
  let t
  if (v) {
    t = JSON.parse(v)
    formState.username = t.username
    formState.password = t.password
  }
}
getRememberMe()

const mainStore = useMainStore();

// 登录
const loginHandle = () => {

  // if (formState.remember) {
  // todo 从后端登录后返回的加密串保存到浏览器缓存中
  // localStorage.setItem(remberMeLocalStorageKey, JSON.stringify(formState))
  // }
  login(formState).then(async res => {
    console.log(res)
    if (res.code === 200 && res.data) {
      // 设置用户信息
      mainStore.$state.user = res.data
      mainStore.$state.sysRole = res.data.sysRole;
      mainStore.$state.groupRoleList = res.data.groupRoleList;
      notification.success({
        title: '登录成功！',
        content: '即将跳转主页',
        duration: 1000,
        closable: true
      });

      await useMenuStore().getMenuMap().then(async () => {
        await addDynamicMenuAndRoutes();
      });
      setTimeout(() => {
        // 跳转主页
        router.push({name: 'Index'});
      }, 600)
    }
  })
}
const disabled = computed(() => {
  return !(formState.username && formState.password && formState.verifyCode);
});


// 点击现在注册按钮
const isRegister = ref(false);

// 点击忘记密码按钮
const clickForgetPassword = () => {
  console.log('Click Forget Password')
}

const handleRegister = () => {
  register(formState).then(() => {
    notification.success({
      title: '注册成功！',
      content: '喔吼！又新来了一位伙伴',
      duration: 888
    });
    setTimeout(() => {
      isRegister.value = false;
      getCode();
      formState.verifyCode = '';
    }, 200)
  })
}

</script>

<style scoped>

.app-container {
  height: 100vh;
  box-sizing: border-box;
}

.login-form {
  width: 20rem;
}

.login-form-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remember-me-item {
  width: 100%;
}


</style>
