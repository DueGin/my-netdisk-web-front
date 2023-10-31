<template>
  <div>
    <SiderLayout>
      <template #content>
        <media-list/>
      </template>
    </SiderLayout>
  </div>
</template>

<script setup lang="ts">

import SiderLayout from "@/components/layout/siderLayout/SiderLayout.vue";
import MediaList from "@/views/media/MediaList.vue";
</script>

<style scoped>

</style>
