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
        <n-form-item
            label="用户名"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <n-input v-model:value="formState.username" clearable >
            <template #prefix>
              <icon icon="ant-design:user-outlined"/>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <n-input type="password" v-model:value="formState.password" clearable >
            <template #prefix>
              <icon icon="ant-design:lock-outlined"/>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item class="remember-me-item" name="remember" no-style>
          <div style="display: flex; margin: 0 1rem;justify-content: space-between; width: 100%;">
            <n-checkbox v-model:checked="formState.remember">记住密码</n-checkbox>
            <n-button @click="clickForgetPassword" :focusable="false" text>忘记密码？</n-button>
          </div>
        </n-form-item>

        <div style="display: flex; justify-content: center; column-gap: 1rem;align-items: center;margin-top: 1rem; position: relative">
          <n-button
              :disabled="disabled"
              type="primary"
              html-type="submit"
              class="login-form-button"
              style="width: 30%"
              @click="login"
          >
            登录
          </n-button>
          <n-button style="position: absolute; right: 10px;" @click="navigateToRegister" text :focusable="false">
            现在注册！
          </n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive} from 'vue';
import {Icon} from "@iconify/vue";

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const remberMeLocalStorageKey = 'login'
// 获取remember me
const getRememberMe = ()=>{
  let v = localStorage.getItem(remberMeLocalStorageKey)
  let t
  v && (t = JSON.parse(v))
  formState.username = t.username
  formState.password = t.password
}
getRememberMe()

// 登录
const login = () => {
  if(formState.remember){
    // todo 从后端登录后返回的加密串保存到浏览器缓存中
    localStorage.setItem(remberMeLocalStorageKey, JSON.stringify(formState))
  }
  console.log("login==>", formState)

}
const disabled = computed(() => {
  return !(formState.username && formState.password);
});


// 点击现在注册按钮
const navigateToRegister = () => {
  console.log('Click Register Now!')
}

// 点击忘记密码按钮
const clickForgetPassword = () => {
  console.log('Click Forget Password')
}


</script>

<style scoped>

.app-container {
  height: 100vh;
  box-sizing: border-box;
}

.login-form {
  width: 17rem;
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
