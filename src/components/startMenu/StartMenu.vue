<template>
  <div class="start-menu-container">
    <div v-for="item in menu" class="start-menu-item">
      <router-link :to="{name: item.pathName}" class="drop-link-style menu-item">
        <n-icon size="3rem">
          <Icon :icon="item.icon"/>
        </n-icon>
        <span>{{ item.label }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {getStartMenuList} from "@/apis/menu/menuRequest.ts";


const menu = ref([])
getStartMenuList().then(res => {
  console.log('startMenu', res)
  if (res.code === 200 && res.data) {
    menu.value = res.data
  }
})
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
}

.menu-item{
  display: grid;
  grid-template-rows: 70% 30%;
  row-gap: 3px;
  align-items: center;
  justify-items: center;
}
</style>
