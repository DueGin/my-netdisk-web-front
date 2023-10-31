<template>
  <div class="app-container">
    <div class="query-container">
      <n-form
          ref="formRef"
          inline
          :label-width="80"
          :model="queryForm"
          :rules="rules"
          size="medium"
          label-placement="left"
          label-width="auto"
          style="flex-wrap: wrap;"
      >
        <n-form-item label="用户名" path="user.name">
          <n-input v-model:value="queryForm.username" placeholder="输入姓名"/>
        </n-form-item>
        <n-form-item label="用户状态" path="user.age">
          <n-select
              v-model:value="queryForm.status"
              :options="options"
              placeholder="请选择用户状态"
              clearable
              style="width: 10rem;"
          />
        </n-form-item>
        <n-form-item label="电话号码" path="phone">
          <n-input v-model:value="queryForm.phone" placeholder="电话号码"/>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" attr-type="button" @click="handleValidateClick">
            查询
          </n-button>
        </n-form-item>

      </n-form>
    </div>

    <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="false"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, h, ref} from 'vue'
import type {DataTableColumns} from 'naive-ui'
import {NButton, NSwitch} from "naive-ui";
import User from "@/apis/user/user.ts";
import {getUserList} from "@/apis/user/request.ts";

export default defineComponent({
  setup() {
    return {
      data,
      columns: createColumns(),
      pagination: false,

      queryForm: formValue,
      rules: rules,
      options: options,

    }
  },
  methods: {
    handleValidateClick(e) {
      console.log(e)
    }
  }
})

const options = [
  {
    label: '正常',
    value: 1,
  }, {
    label: "冻结",
    value: 0
  }
]

const rules = ref({
  name: {
    message: '请输入姓名',
    trigger: 'blur'
  },
  phone: {
    message: '请输入电话号码',
    trigger: ['input']
  }
})

// 查询条件表单
const formValue = ref({
  username: '',
  phone: '',
  status: undefined,
})


// 表头
const createColumns = (): DataTableColumns<User> => {
  return [
    {
      title: '序号',
      key: 'orderNum',
      render(rowData, rowIndex) {
        return rowIndex + 1;
      }
    },
    {
      title: '用户名',
      key: 'username'
    },
    {
      title: '用户类型',
      key: 'type',
      render(rowData, rowIndex){
        if(rowData.type === 1){
          return '超级管理员'
        }else {
          return '普通用户'
        }
      }
    }, {
      title: '权限配置',
      key: '',
      render(row) {
        return h(
            NButton,
            {
              type: 'link',
              bordered: false,
              focusable: false,
              onClick: () => {
                console.log("!!!")
              }
            },
            {
              default: () => '权限配置'
            }
        )
      }
    }, {
      title: '用户状态',
      key: 'status',
      render(row) {
        return h(
            NSwitch,
            {
              checkedValue: 1,
              uncheckedValue: 0,
              value: row.status,
              onUpdateValue: (e) => {
                row.status = e
                console.log(row.status)
              },
            }, {
              unchecked: () => '冻结',
              checked: () => '正常',
            }
        )
      }
    }
  ]
}

// 获取用户列表
export const data = ref<Array<User>>(getUserList())


</script>


<style scoped>


</style>
