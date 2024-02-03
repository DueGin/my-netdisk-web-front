<template>
  <div class="app-container">
    <n-button @click="router.go(-1)">返回</n-button>
    <n-pro-table
        name="字典"
        :columns="columns"
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
import NProTableColumn from "@/components/n-pro-table/NProTableColumn.ts";
import {h, reactive, ref, watch} from "vue";
import {getDictPage, removeDict, saveDict, updateDict} from "@/apis/sys/dict/DictApi.ts";
import Pagination from "@/components/n-pro-table/Pagination.ts";
import {NTag} from "naive-ui";
import {useRoute} from "vue-router";
import {notification} from "@/utils/tip/TipUtil.ts";
import router from "@/router";

let idx = 1;
const columns: NProTableColumn[] = [
  {
    title: '序号',
    prop: 'idx',
    columnType: 'index',
    columnDataRender: ()=>idx++
  },
  {
    title: '字典名称',
    prop: 'label',
    formType: 'input',
    required: true,
  },
  {
    title: '字典值',
    prop: 'value',
    formType: 'input',
    required: true,
  },
  {
    title:'备注📝',
    prop:'remark',
    formType:'input',
  },
  {
    title: '状态',
    prop: 'status',
    columnDataRender: (rowData, rowIndex) => h(NTag, {
      type: rowData.status === 1 ? 'success' : 'error'
    }, {
      default: () => rowData.status === 1 ? '启用' : '禁用'
    }),
    required: true,
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
    fixed: 'right'
  }
];

const route = useRoute();
let dictType;
watch(() => route.query, (from, to) => {
  if (from && from.dictType) {
    dictType = from.dictType
  }
}, {immediate: true})

const data = ref([]);
const pagination = reactive<Pagination>(new Pagination());

const getList = (params) => {
  if (!dictType) {
    notification.error({
      title: '网址有误！',
      content: '歪，你从哪儿来的？',
      duration: 1288
    })
    return;
  }
  getDictPage({...params, dictType: dictType}).then(res => {
    if (res.code === 200 && res.data) {
      data.value = res.data.records;
      Pagination.setByPage(res.data, pagination);
      idx = 1;
    }
  })
}

const handleSave = (formData, cb) => {
  cb(saveDict({...formData, dictType: dictType}));
  idx = 1;
}

const handleUpdate = (formData, cb) => {
  cb(updateDict({...formData, dictType: dictType}));
  idx = 1;
}

const handleRemove = (id, cb) => {
  cb(removeDict(id));
  idx = 1;
}
</script>

<style scoped>

</style>
