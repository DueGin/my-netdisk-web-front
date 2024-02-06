<template>
  <div class="app-container">
<!--    <div class="query-container">-->
<!--      <n-form-->
<!--          ref="formRef"-->
<!--          inline-->
<!--          :label-width="80"-->
<!--          :model="queryData"-->
<!--          size="medium"-->
<!--          label-placement="left"-->
<!--          label-width="auto"-->
<!--          style="flex-wrap: wrap;"-->
<!--      >-->
<!--        <n-form-item label="姓名" path="user.name">-->
<!--          <n-input v-model:value="queryData.groupName" placeholder="请输入xin" clearable/>-->
<!--        </n-form-item>-->
<!--        &lt;!&ndash;        <n-form-item label="组拥有者" path="phone">&ndash;&gt;-->
<!--        &lt;!&ndash;          <n-input v-model:value="queryData.godId" placeholder="请输入组拥有者" clearable/>&ndash;&gt;-->
<!--        &lt;!&ndash;        </n-form-item>&ndash;&gt;-->
<!--        <n-form-item>-->
<!--          <n-button type="primary" attr-type="button" @click="handleQuery">-->
<!--            查询-->
<!--          </n-button>-->
<!--        </n-form-item>-->
<!--      </n-form>-->
<!--    </div>-->
    <n-data-table :columns="columns" :data="groupList"/>
  </div>
</template>

<script setup lang="ts">

import {h, reactive, ref} from "vue";
import TableActions from "@/components/tableActions/TableActions.vue";

const columns = ref([])
columns.value = [
  {title: '用户', key: 'username', align: 'center',},
  {title: '权限', key: 'userRole', align: 'center',},
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
