<template>
  <n-form
      ref="formRef"
      :label-width="80"
      :model="formData"
  >
    <n-form-item label="用户名" path="username">
      <n-input v-model:value="formData.username" placeholder="输入用户名"/>
    </n-form-item>
    <n-form-item label="手机号码" path="phone">
      <n-input v-model:value="formData.phone" placeholder="输入手机号码"/>
    </n-form-item>
    <n-form-item label="邮箱" path="email">
      <n-input v-model:value="formData.email" placeholder="请输入邮箱📮"/>
    </n-form-item>
    <n-form-item label="角色" path="sysRole">
      <n-radio-group v-model:value="formData.sysRole">
        <n-space>
          <n-radio v-for="item in sysRoleOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="$emit('handleConfirm', formData)">
        保存
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {FormInst} from "naive-ui";

defineProps({
  formData: {
    default: {}
  }
});

defineEmits<{
  (e: 'handleConfirm', formData: any)
}>();

const sysRoleOptions = []


const formRef = ref<FormInst | null>(null);


</script>

<style scoped>

</style>
