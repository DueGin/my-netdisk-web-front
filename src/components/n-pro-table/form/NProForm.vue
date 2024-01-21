<template>
  <n-form
      ref="formRef"
      :label-width="80"
      :model="formData"
      size="medium"
      :inline="inline"
      :key="formKey"
      label-placement="left"
      label-width="auto"
      style="flex-wrap: wrap;"
      @submit="onSubmit"
  >
    <n-form-item
        v-for="item in <Array<FormItem>>formFields"
        :path="item.prop"
        :label="item.label"
        :size="size ? size:'medium'"
        :required="item.required && formType === 'editForm' ? item.required : false"
    >
      <!-- 表单类型 -->
      <!-- 输入框 -->
      <n-input
          v-if="item.formType === 'input'"
          v-model:value="formData[item.prop]"
          :placeholder="`请输入${item.label}`"
          :style="{width: item.width && typeof item.width === 'string' && (item.width.endsWith('px') || item.width.endsWith('rem')) ? (<string>item.width).endsWith: '10rem'}"
          clearable
      />
      <!-- 选择器 -->
      <n-select
          v-else-if="item.formType === 'selection'"
          v-model:value="formData[item.prop]"
          :options="item.selectionOptions ? item.selectionOptions : []"
          :placeholder="`请选择${item.label}`"
          :style="{width: item.width && typeof item.width === 'string' && (item.width.endsWith('px') || item.width.endsWith('rem')) ? (<string>item.width).endsWith: '10rem'}"
          clearable
      />
      <!-- 日期时间选择器 -->
      <n-date-picker
          v-else-if="item.formType === 'date-picker'"
          v-model:value="formData[item.prop]"
          :type="item.dateType"
          :placeholder="`请选择${item.label}`"
          :style="{width: item.width && typeof item.width === 'string' && (item.width.endsWith('px') || item.width.endsWith('rem')) ? (<string>item.width).endsWith: '13rem'}"
          clearable
      />
    </n-form-item>
    <n-form-item :label="!formType || formType === 'editForm' ? ' ': ''" :size="size ? size:'medium'">
      <n-button @click="$emit('resetForm', formData)">
        重置
      </n-button>
      <n-button
          v-if="!formType || formType === 'editForm'"
          type="primary"
          attr-type="button"
          @click="$emit('handleSave', formData)"
          style="margin-left: 1rem"
      >
        保存
      </n-button>
    </n-form-item>
    <n-form-item
        :size="size ? size:'medium'"
        v-if="formType && formType === 'queryForm'"
    >
      <n-button type="primary" attr-type="button" @click="$emit('getListApi', formData)">
        搜索
      </n-button>
    </n-form-item>

    <slot name="form-item" :item="formData"/>
  </n-form>
</template>

<script setup lang="ts">
import FormItem from "@/components/n-pro-table/FormItem.ts";
import {NProFormType} from "@/components/n-pro-table/form/NProFormType.ts";
import {NProFormSize} from "@/components/n-pro-table/form/NProFormSize.ts";
import {NButton} from "naive-ui";

interface Props {
  // 表单字段项列表
  formFields: FormItem[],
  // 表单size
  size?: NProFormSize,
  // 表单类型
  formType?: NProFormType,
  // 是否为行内表单
  inline?: boolean,
  // 表单key
  formKey: number
}

// const props = defineProps<Props>();
// const {
//   formFields = props.formFields ? props.formFields : [],
//   size = props.size ? props.size : NProFormSize.medium,
//   inline = props.inline ? props.inline : false,
//   formType = props.formType ? props.formType : NProFormType.editForm,
//   formKey = props.formKey ? props.formKey : 0,
// } = props

// @ts-ignore
const props = withDefaults(defineProps<Props>(), {
  formFields: () => [],
  size: NProFormSize.medium,
  inline: false,
  formType: NProFormType.editForm,
  formKey: 0
})

const formData = defineModel<Record<string, any>>('formData', {default: {}})


console.log(props.formFields, formData, props.size, props.formType)


const emits = defineEmits<{
  (e: 'handleSubmit', formData: object),
  (e: 'submitSuccess'),
  (e:'resetForm', formData: object)
  (e:'handleSave', formData: object)
  (e:'getListApi', formData: object)
}>();


const onSubmit = () => {
  emits('handleSubmit', formData);
  emits('submitSuccess')
}

</script>

<style scoped>

</style>
