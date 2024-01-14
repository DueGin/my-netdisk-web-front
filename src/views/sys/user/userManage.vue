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
          @submit=""
      >
        <n-form-item label="用户名" path="user.name">
          <n-input v-model:value="queryData.username" placeholder="输入姓名" clearable/>
        </n-form-item>
        <n-form-item label="电话号码" path="phone">
          <n-input v-model:value="queryData.phone" placeholder="电话号码" clearable/>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" attr-type="button" @click="handleClick">
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
        align="center"
        striped
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
import {NButton} from "naive-ui";
import User from "@/model/user/User.ts";
import {getUserList} from "@/apis/user/userRequest.ts";
import TableActions from "@/components/tableActions/TableActions.vue";


const total = ref(0)

interface QueryData {
  pageSize: number,
  pageNum: number,
  username: any,
  phone: any,
}

// 查询条件表单
const queryData = reactive<QueryData>({
  pageSize: 10,
  pageNum: 1,
  username: undefined,
  phone: undefined,
})
const data = ref<Array<User>>([]);
// 点击查询
const handleClick = () => {
  console.log(queryData)
  if (queryData.phone === '') {
    queryData.phone = undefined
  }
  if (queryData.username === '') {
    queryData.username = undefined
  }
  getUserList(queryData).then(res => {
    console.log(res)
    if (res.code === 200 && res.data) {
      data.value = res.data.rows
      total.value = res.data.total
      queryData.pageNum = res.data.page
    }
  })
}
handleClick();


// 表头
const createColumns = [
  {
    title: '序号',
    key: 'orderNum',
    align: 'center',
    render(rowData, rowIndex) {
      return rowIndex + 1;
    }
  },
  {
    title: '用户名',
    key: 'username',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '用户类型',
    key: 'type',
    align: 'center',
    render(rowData, rowIndex) {
      if (rowData.type === 1) {
        return '超级管理员'
      } else {
        return '普通用户'
      }
    }
  }, {
    title: '角色分配',
    key: 'editRole',
    align: 'center',
    render(row) {
      return h(
          NButton,
          {
            type: 'primary',
            size: "tiny",
            strong: true,
            secondary: true,
            bordered: false,
            focusable: false,
            onClick: () => {
              console.log("!!!")
            }
          },
          {
            default: () => '角色配置'
          }
      )
    }
  }, {
    title: '操作',
    key: 'actions',
    align: 'center',
    render(row) {
      return h(
          "div",
          {},
          h(TableActions,
              {
                handleEdit: (e) => {
                  console.log(e)
                },
                handleDelete: (e) => {
                  console.log(e)
                }
              }
          )
      )
    }
  }
]

const columns = ref(createColumns)


</script>


<style scoped>


</style>
