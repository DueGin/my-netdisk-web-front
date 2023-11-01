<template>
  <headerLayout :isUseRouter="false">
    <template #content>
      <SiderLayout :isUseRouter="true"/>
    </template>
  </headerLayout>

</template>

<script setup lang="ts">

import HeaderLayout from "@/components/layout/headerLayout/HeaderLayout.vue";
import SiderLayout from "@/components/layout/siderLayout/SiderLayout.vue";
</script>

<style scoped>

</style>
