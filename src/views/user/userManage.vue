<template>
  <div class="app-container">
    <div class="query-container">
      <n-form
          ref="formRef"
          inline
          :label-width="80"
          :model="queryData"
          size="medium"
          label-placement="left"
          label-width="auto"
          style="flex-wrap: wrap;"
      >
        <n-form-item label="用户名" path="user.name">
          <n-input v-model:value="queryData.username" placeholder="输入姓名"/>
        </n-form-item>
        <n-form-item label="用户状态" path="user.age">
          <n-select
              v-model:value="queryData.status"
              :options="options"
              placeholder="请选择用户状态"
              clearable
              style="width: 10rem;"
          />
        </n-form-item>
        <n-form-item label="电话号码" path="phone">
          <n-input v-model:value="queryData.phone" placeholder="电话号码"/>
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
        :pagination="false"
        :bordered="false"

    />
    <n-pagination
        v-model:page="queryData.pageNum"
        v-model:page-size="queryData.pageSize"
        :item-count="total"
        :page-sizes="[10, 20, 30, 40]"
        show-size-picker
    />
  </div>
</template>

<script setup lang="ts">
import {h, reactive, ref} from 'vue'
import type {DataTableColumns} from 'naive-ui'
import {NButton, NSwitch} from "naive-ui";
import User from "@/model/user/User.ts";
import {getUserList} from "@/apis/user/userRequest.ts";


const total = ref(0)

// 查询条件表单
const queryData = reactive({
  pageSize: 10,
  pageNum: 1,
  username: undefined,
  phone: undefined,
  status: undefined,
})
const data = ref<Array<User>>([]);
// 点击查询
const handleValidateClick = () => {

  console.log()
  getUserList(queryData).then(res => {
    console.log(res)
    if (res.code === 200 && res.data) {
      data.value = res.data.rows
      total.value = res.data.total
      queryData.pageNum = res.data.page
    }
  })
}
handleValidateClick()


const options = [
  {
    label: '正常',
    value: 1,
  }, {
    label: "冻结",
    value: 0
  }
]






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
      render(rowData, rowIndex) {
        if (rowData.type === 1) {
          return '超级管理员'
        } else {
          return '普通用户'
        }
      }
    }, {
      title: '权限配置',
      key: 'actions',
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
const columns = ref(createColumns())


</script>


<style scoped>


</style>
