<template>
<div class="app-container">
detail
</div>
</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {watch, ref} from "vue";

const route = useRoute();

let groupId = null;
// 接收groupId
watch(() => route.query, (from, to) => {
  console.log(from, to)
  if(to && to.groupId){
    console.log(to.groupId)
    groupId = to.groupId
    getGroupDetail();
  }
}, {immediate: true})


const groupDetail = ref();
const getGroupDetail = ()=>{

}


</script>

<style scoped>

</style>
