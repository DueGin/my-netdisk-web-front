<template>
  <div class="app-container">
    <n-pro-table
        :columns="columns"
        :tableData="list"
        :pagination="pagination"
        @getListApi="getList"
        @handleSave="handleSave"
        @handleModify="handleModify"
        @handleRemove="handleRemove"
        addButtonName="字典类型"
        size="medium"
    />
  </div>
</template>

<script setup lang="ts">

import {NTag} from "naive-ui";
import {h, ref} from "vue";
import TableActions from "@/components/tableActions/TableActions.vue";
import {getDictTypePage} from "@/apis/sys/dict/DictApi.ts";
import NProTable from "@/components/n-pro-table/NProTable.vue";
import Pagination from "@/components/n-pro-table/Pagination.ts";
import NProTableColumn from "@/components/n-pro-table/NProTableColumn.ts";
import {removeDictType, saveDictType, updateDictType} from "@/apis/dict/DictApi.ts";
import {notification} from "@/utils/tip/TipUtil.ts";

let idx = 1;
const columns: NProTableColumn[] = [
  {
    title: '序号',
    prop: 'idx',
    columnType: 'index',
    columnDataRender: () => {
      return idx++
    }
  },
  {
    title: '字典类型',
    prop: 'code',
    formType: 'input',
    isQueryField: true,
    required: true,
  },
  {
    title: '字典名称',
    prop: 'name',
    formType: 'input',
    isQueryField: true,
    required: true
  },
  {
    title: '状态',
    prop: 'status',
    columnDataRender: (rowData, rowIndex) => h(NTag, {
      type: rowData.status === 1 ? 'success' : 'error'
    }, {
      default: () => rowData.status === 1 ? '启用' : '禁用'
    }),
    formType: 'selection',
    selectionOptions: [
      {
        label: '启用',
        value: 1
      },
      {
        label: '禁用',
        value: 0
      }
    ]
  },
  {
    title: '操作',
    prop: 'control',
    columnType: 'control',
    // columnDataRender: (row) => h(TableActions, {
    //   handleEdit: () => {
    //     console.log("edit", row);
    //   },
    //   handleDelete: () => {
    //     console.log("delete", row);
    //   }
    // })
  }
]


const list = ref([]);
let pagination = ref<Pagination>(new Pagination());
const getList = (param) => {
  getDictTypePage(param).then(res => {
    if (res.code === 200 && res.data) {
      list.value = res.data.records;
      pagination.value.pageSize = res.data.pageSize;
      pagination.value.pageNumber = res.data.pageNumber;
      pagination.value.totalRow = res.data.totalRow;
      idx = 1;
    }
  })
}

const handleSave = (formData, cb) => {
  cb(saveDictType(formData))
}

const handleModify = (formData, cb)=>{
  cb(updateDictType(formData))
}

const handleRemove = (id, cb)=>{
  cb(removeDictType(id))
}

</script>

<style scoped>

</style>
