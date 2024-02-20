<template>
  <div class="app-container">
    <n-pro-table
        name="用户"
        :columns="columns"
        :table-data="list"
        :pagination="pagination"
        @getListApi="getList"
        @handleSave="handleSave"
        @handleUpdate="handleUpdate"
        @handleRemove="handleRemove"
    />
  </div>
</template>

<script setup lang="ts">
import {h, reactive, ref} from 'vue';
import {getUserList, removeUserByAdmin, saveUserByAdmin, updateUserByAdmin} from "@/apis/sys/user/SysUserApi.ts";
import NProTable from "@/components/n-pro-table/NProTable.vue";
import NProTableColumn from "@/components/n-pro-table/NProTableColumn.ts";
import {getRoleListByType} from "@/apis/sys/role/RoleApi.ts";
import Pagination from "@/components/n-pro-table/Pagination.ts";


const total = ref(0)

let roleList = ref<{ label: string, value: string }[]>([]);
const getRoleList = () => {
  getRoleListByType(1).then(res => {
    if (res.code === 200) {
      let roles = [];
      res.data.forEach(r => {
        let role = {
          label: r.description,
          value: r.id
        }
        roles.push(role);
      })
      roleList.value = roles;
    }
  })
}
getRoleList();

let idx = 1;
// 表头
const columns = ref<NProTableColumn[]>([
  {
    title: '序号',
    prop: 'idx',
    columnType: 'index',
    columnDataRender: () => idx++
  },
  {
    title: '用户名',
    prop: 'username',
    formType: 'input',
    isQueryField: true,
  },
  {
    title: '角色',
    prop: 'sysRoleId',
    formType: 'selection',
    selectionOptions: roleList,
    columnDataRender: (rowData) => h('span', {}, {
      default: () => {
        let find = roleList.value.find(r => r.value === rowData.sysRoleId);
        return find ? find.label : '--';
      }
    })
  },
  {
    title: '操作',
    prop: 'control',
    fixed: 'right',
    columnType: 'control'
  }
])

const pagination = reactive<Pagination>(new Pagination());
const list = ref([]);
const getList = (params) => {
  getUserList(params).then(res => {
    console.log(res)
    if (res.data) {
      list.value = res.data.records;
      Pagination.setByPage(res.data, pagination);
      idx = 1;
    }
  })
}

const handleSave = async (formData, cb) => {
  await cb(saveUserByAdmin(formData));
  idx = 1;
}

const handleUpdate = async (formData, cb) => {
  await cb(updateUserByAdmin(formData));
  idx = 1;
}

const handleRemove = async (id, cb) => {
  await cb(removeUserByAdmin(id));
  idx = 1;
}

</script>


<style scoped>


</style>
