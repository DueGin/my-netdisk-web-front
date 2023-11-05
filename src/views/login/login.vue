<template>
  <div class="app-container">
    <div class="login-form-container">
      <n-form
          :model="formState"
          name="normal_login"
          class="login-form"
          v-bind="layout"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
      >
        <n-form-item
            label="用户名"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <n-input v-model:value="formState.username">
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
          <n-input type="password" v-model:value="formState.password">
            <template #prefix>
              <icon icon="ant-design:lock-outlined"/>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item class="remember-me-item" name="remember" no-style>
          <div style="display: flex; margin-left: 1rem;justify-content: space-between;">
            <n-checkbox v-model:checked="formState.remember">Remember me</n-checkbox>
            <a class="login-form-forgot" href="">忘记密码？</a></div>
        </n-form-item>

          <div style="display: flex; justify-content: flex-end; column-gap: 1rem;align-items: center;margin-top: 1rem;">
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
            <a href="">现在注册！</a></div>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive} from 'vue';
import {Icon} from "@iconify/vue";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

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

const login = () => {
  console.log("login==>", formState)
}

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});

</script>

<style scoped>
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


/*.remember-me-item >>> .ant-form-item-control-input-content{
  display: flex;
}*/


</style>
