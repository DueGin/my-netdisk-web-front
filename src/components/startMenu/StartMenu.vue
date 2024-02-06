<template>
  <div class="start-menu-container">
    <div v-for="item in menuList" class="start-menu-item">
      <router-link :to="item.pathName ? {name: item.pathName}: {path: item.path}" class="drop-link-style menu-item">
        <n-icon size="2rem">
          <Icon :icon="item.icon"/>
        </n-icon>
        <span>{{ item.label }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {useMenuStore} from "@/store/menuStore/MenuStore.ts";


const menuList = ref([])
const menuStore = useMenuStore();
menuStore.getMenuMap().then(map => {
  let startMenu = map.startMenu;
  if (startMenu) {
    let menus = [];
    startMenu.forEach(m => {
      let menu = {
        label: m.name,
        key: m.id,
        icon: m.icon,
        path: m.path,
        roleName: m.roleName
      }
      menus.push(menu);
    })
    menuList.value = menus;
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

.menu-item {
  display: grid;
  grid-template-rows: 70% 30%;
  row-gap: 3px;
  align-items: center;
  justify-items: center;
}
</style>
