<template>
  <n-form
      ref="formRef"
      :label-width="80"
      :model="formData"
      :size="size ? size : 'medium'"
      :inline="inline"
      :key="formKey"
      label-placement="left"
      label-width="auto"
      style="flex-wrap: wrap;"
  >
    <n-form-item
        v-for="item in <Array<FormItem>>formFields"
        :path="item.prop"
        :label="item.label"
        :label-width="item.labelWidth? item.labelWidth: 'auto'"
        :label-align="item.labelAlign ? item.labelAlign : 'right'"
        :size="size ? size : 'medium'"
        :required="item.required && formType && formType === 'editForm' ? item.required : false"
    >
      <!-- region 表单类型 -->
      <!-- 输入框 -->
      <n-input
          v-if="item.formType === 'input'"
          v-model:value="formData[item.prop]"
          :placeholder="`请输入${item.label}`"
          :style="{width: getWidth(item, '13rem')}"
          clearable
      />
      <!-- 选择器 -->
      <n-select
          v-else-if="item.formType === 'selection'"
          v-model:value="formData[item.prop]"
          :options="getSelectOptions(item)"
          :placeholder="`请选择${item.label}`"
          :style="{width: getWidth(item, '13rem')}"
          clearable
      />
      <!-- 日期时间选择器 -->
      <n-date-picker
          v-else-if="item.formType === 'date-picker'"
          v-model:value="formData[item.prop]"
          :type="item.dateType"
          :placeholder="`请选择${item.label}`"
          :style="{width: getWidth(item, '16rem')}"
          clearable
      />
      <!-- 其他类型表单render -->
      <component
          v-else-if="item.formType === 'other' && item.formItemRender"
          :is="item.formItemRender(formData[item.prop])"
          v-model:value="formData[item.prop]"
      />
      <!-- endregion 表单类型 -->
    </n-form-item>

    <slot name="form-item" :item="formData"/>

    <n-form-item
        v-if="formType && formFields && formFields.length !== 0"
        :label="!formType || formType === 'editForm' ? ' ': ''"
        :label-width="formFields[0]?.labelWidth ? formFields[0].labelWidth: 'auto'"
        :size="size ? size:'medium'"
    >
      <n-button v-if="$emit('resetForm', formData)" @click="$emit('resetForm', formData)">
        重置
      </n-button>
      <n-button
          v-if="!formType || formType === 'editForm'"
          type="primary"
          attr-type="button"
          @click="onSubmit"
          style="margin-left: 1rem"
      >
        保存
      </n-button>
    </n-form-item>
    <n-form-item
        v-if="formType && formType === 'queryForm' && formFields && formFields.length !== 0"
        :size="size ? size:'medium'"
    >
      <n-button type="primary" attr-type="button" @click="onSubmit">
        搜索
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import FormItem from "@/components/n-pro-table/form/FormItem.ts";
import {NProFormType} from "@/components/n-pro-table/form/NProFormType.ts";
import {NProFormSize} from "@/components/n-pro-table/form/NProFormSize.ts";
import {NButton} from "naive-ui";
import {computed, isRef, unref} from "vue";

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


console.log('表单字段属性：', props.formFields, "表单数据：", formData, "表单类型：", props.formType)


const emits = defineEmits<{
  (e: 'handleSubmit', formData: object),
  // (e: 'submitSuccess'),
  (e: 'resetForm', formData: object)
  (e: 'getListApi', formData: object)
}>();

// 表单提交
const onSubmit = () => {
  emits('handleSubmit', formData);
  // emits('submitSuccess')
}

const getSelectOptions = (item: FormItem) => {
  if (item.selectionOptions) {
    if (isRef(item.selectionOptions)) {
      return unref(item.selectionOptions);
    } else {
      return item.selectionOptions;
    }
  }
  return [];
}

// 表单项宽度
const getWidth = (item: FormItem, defaultWidth: string): string => {
  if (item.formItemSlotWidth && typeof item.formItemSlotWidth === 'string'
      && (item.formItemSlotWidth.endsWith('px') || item.formItemSlotWidth.endsWith('rem'))) {
    return <string>item.formItemSlotWidth.endsWith;
  }
  return defaultWidth;
}

</script>

<style scoped>

</style>
