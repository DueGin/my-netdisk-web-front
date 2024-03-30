<template>
    <div class="app-container">
        <n-pro-table
            :columns="columns"
            :tableData="list"
            :pagination="pagination"
            @getListApi="getList"
            @handleSave="handleSave"
            @handleUpdate="handleUpdate"
            @handleRemove="handleRemove"
            name="枚举类型"
        />
    </div>
</template>

<script setup lang="ts">

import {NTag} from "naive-ui";
import {h, reactive, ref} from "vue";
import {getEnumTypePage, removeEnumType, saveEnumType, updateEnumType} from "@/apis/sys/enumType/EnumTypeApi.ts";
import NProTable from "@/components/n-pro-table/NProTable.vue";
import Pagination from "@/components/n-pro-table/Pagination.ts";
import NProTableColumn from "@/components/n-pro-table/NProTableColumn.ts";
import {renderLinkTextWithPath} from "@/utils/render/RouterLinkRender.ts";

let idx = 1;
const columns: NProTableColumn[] = [
    {
        title: '序号',
        prop: 'idx',
        columnType: 'index',
        columnDataRender: () => idx++
    },
    {
        title: '枚举类型',
        prop: 'type',
        formType: 'input',
        isQueryField: true,
        required: true,
        columnDataRender: (rowData) => renderLinkTextWithPath('/sys/enum', rowData.code, {enumType: rowData.type})
    },
    {
        title: '枚举名称',
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
        fixed: "right",
    }
]


const list = ref([]);
let pagination = reactive<Pagination>(new Pagination());
const getList = (param) => {
    getEnumTypePage(param).then(res => {
        if (res.code === 200 && res.data) {
            list.value = res.data.records;
            Pagination.setByPage(res.data, pagination);
            idx = 1;
        }
    })
}

const handleSave = async (formData, cb) => {
    await cb(saveEnumType(formData));
    idx = 1;
}

const handleUpdate = async (formData, cb) => {
    await cb(updateEnumType(formData));
    idx = 1;
}

const handleRemove = async (id, cb) => {
    await cb(removeEnumType(id));
    idx = 1;
}

</script>

<style scoped>

</style>
