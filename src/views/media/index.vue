<template>
  <div class="app-container">
    indexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    <div v-for="i in 100">
      {{ i }}
    </div>
  </div>
</template>

<script setup lang="ts">

import {onActivated} from "vue";

onActivated(() => {
  console.log('activated home')
})

</script>

<style scoped>

</style>
