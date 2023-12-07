<template>
<div class="app-container">
  <n-data-table :columns="columns" :data="groupList"/>
</div>
</template>

<script setup lang="ts">

import {h, ref} from "vue";

const columns = ref([])
columns.value = [
  {title: '组ID', key:'groupId'},
  {title: '组名称', key: 'groupName'},
  {title: '创建时间', key: 'createTime'},
  {title: '更新时间', key: 'updateTime'},
  {title: '拥有者', key: 'userId'},
  {title: '操作', key:'', render(row){
    return h(

    )
    }},
]



const groupList = ref([])

</script>

<style scoped>

</style>
