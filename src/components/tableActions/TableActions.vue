<template>
  <div class="table-actions-ctn">
    <n-button
        class="table-actions-button"
        :bordered="false"
        :focusable="false"
        strong
        quaternary
        type="info"
        size="tiny"
        @click="handleEdit"
    >
      编辑
    </n-button>
    <n-button
        class="table-actions-button"
        :bordered="false"
        :focusable="false"
        strong
        quaternary
        type="info"
        size="tiny"
        @click="handleDelete"
    >
      删除
    </n-button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  handleEdit: Function,
  handleDelete: Function,
});
</script>

<style scoped>
.table-actions-ctn {
  display: flex;
  column-gap: 8px;
  align-items: center;
  justify-content: center;
}
</style>
