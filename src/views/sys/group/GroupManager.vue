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
        <n-form-item label="组名称" path="user.name">
          <n-input v-model:value="queryData.groupName" placeholder="请输入组名称" clearable/>
        </n-form-item>
<!--        <n-form-item label="组拥有者" path="phone">-->
<!--          <n-input v-model:value="queryData.godId" placeholder="请输入组拥有者" clearable/>-->
<!--        </n-form-item>-->
        <n-form-item>
          <n-button type="primary" attr-type="button" @click="handleQuery">
            查询
          </n-button>
        </n-form-item>

      </n-form>
    </div>
    <n-data-table :columns="columns" :data="groupList"/>
  </div>
</template>

<script setup lang="ts">

import {h, reactive, ref} from "vue";
import TableActions from "@/components/tableActions/TableActions.vue";
import {NButton} from "naive-ui";

const columns = ref([])
columns.value = [
  {title: '组ID', key: 'groupId', align: 'center',},
  {title: '组名称', key: 'groupName', align: 'center',},
  {title: '创建时间', key: 'createTime', align: 'center',},
  {title: '更新时间', key: 'updateTime', align: 'center',},
  {title: '拥有者', key: 'groupGodUsername', align: 'center',},
  {
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
  },
]

const groupList = ref([])

interface QueryData {
  size: number,
  pageNum: number,
  groupName: any,
}

// 查询条件表单
const queryData = reactive<QueryData>({
  size: 10,
  pageNum: 1,
  groupName: '',
})
// 查询
const handleQuery = () => {

}

</script>

<style scoped>

</style>
