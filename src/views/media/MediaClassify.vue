<template>
  <div class="app-container">
    <Folder @clickFolder="clickFolder"/>
  </div>
</template>

<script setup lang="ts">

import Folder from "@/components/folder/Folder.vue";

const clickFolder = ()=>{
  console.log('click folder')
}

</script>

<style scoped>

</style>
