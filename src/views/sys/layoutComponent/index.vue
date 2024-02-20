<template>
  <div class="app-container">
    <n-pro-table
        :columns="columns"
        name="布局组件"
        :table-data="data"
        :pagination="pagination"
        @getListApi="getList"
        @handleSave="handleSave"
        @handleUpdate="handleUpdate"
        @handleRemove="handleRemove"
    />
  </div>
</template>

<script setup lang="ts">
import NProTable from "@/components/n-pro-table/NProTable.vue";
import {h, reactive, ref} from "vue";
import NProTableColumn from "@/components/n-pro-table/NProTableColumn.ts";
import {
  getLayoutComponentPage,
  removeLayoutComponent,
  saveLayoutComponent,
  updateLayoutComponent
} from "@/apis/layoutComponent/layoutComponentApi.ts";
import Pagination from "@/components/n-pro-table/Pagination.ts";

let idx = 1;
const columns: NProTableColumn[] = [
  {
    title: '序号',
    prop: 'idx',
    columnType: 'index',
    columnDataRender: () => idx++
  },
  {
    title: '组件名称',
    prop: 'name',
    formType: 'input',
    required: true,
    isQueryField: true,
  },
  {
    title: '组件路径',
    prop: 'path',
    formType: 'input',
    required: true,
    isQueryField: true,
  },
  {
    title: '组件插槽',
    prop: 'hasSlot',
    formType: 'selection',
    isQueryField: true,
    selectionOptions: [
      {
        label: '存在',
        value: 1
      },
      {
        label: '不存在',
        value: 0
      }
    ],
    columnDataRender: (rowData, rowIndex) => h('span', {}, {
      default: () => (<any>rowData).hasSlot === 1 ? '✅' : '❌'
    }),
    required: true,
  },
  {
    title: '路由插槽',
    prop: 'hasRouter',
    formType: 'selection',
    isQueryField: true,
    selectionOptions: [
      {
        label: '存在',
        value: 1
      },
      {
        label: '不存在',
        value: 0
      }
    ],
    columnDataRender: (rowData, rowIndex) => h('span', {}, {
      default: () => (<any>rowData).hasRouter === 1 ? '✅' : '❌'
    }),
    required: true,
  },
  {
    title: '备注📝',
    prop: 'remark',
    formType: 'input',
  },
  {
    title: '创建时间',
    prop: 'createTime',
  },
  {
    title: '更新时间',
    prop: 'updateTime'
  },
  {
    title: '操作',
    prop: 'control',
    columnType: 'control',
    fixed: "right",
  }
]

const data = ref([]);
const pagination = reactive<Pagination>(new Pagination());
const getList = (param) => {
  getLayoutComponentPage(param).then(res => {
    if (res.code === 200 && res.data) {
      data.value = res.data.records;
      Pagination.setByPage(res.data, pagination);
      idx = 1;
    }
  })
}

const handleSave = async (formData, cb) => {
  await cb(saveLayoutComponent(formData));
  idx = 1;
}

const handleUpdate = async (formData, cb) => {
  await cb(updateLayoutComponent(formData));
  idx = 1;
}


const handleRemove = async (id, cb) => {
  await cb(removeLayoutComponent(id));
  idx = 1;
}

</script>

<style scoped>

</style>
