<template>
  <div class="start-menu-container">
    <div v-for="item in menu" class="start-menu-item">
      <n-icon size="3rem">
        <Icon :icon="item.icon"/>
      </n-icon>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

const menu = [
  {
    label: '苹果',
    value: 1,
    icon: 'ion:logo-apple'
  },
  {
    label: 'apps',
    value: 1,
    icon: 'ion:apps'
  }, {
    label: '苹果',
    value: 1,
    icon: 'ion:logo-apple'
  },{
    label: 'apple',
    value: 1,
    icon: 'ion:logo-apple'
  },
  {
    label: 'apps',
    value: 1,
    icon: 'ion:apps'
  }, {
    label: 'apple',
    value: 1,
    icon: 'ion:logo-apple'
  },

]
</script>

<style scoped>
.start-menu-container {
  display: flex;
  width: 16rem;
  padding: 0.5rem;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
}

.start-menu-item {
  width: 4rem;
  display: grid;
  grid-template-rows: 70% 30%;
  align-items: center;
  justify-items: center;
  cursor: pointer;
}
</style>
