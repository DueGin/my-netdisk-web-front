<template>
  <div>
    <n-layout class="layout">
      <n-layout-header class="layout-header-container">
        <div style="color: white;position: absolute; left: 0;padding-left: 1rem;">翻斗花园</div>
        <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="horizontal"
            style="line-height: 3rem;"
        >
          <a-menu-item :key="menu.value" v-for="menu in headerMenuList" style="border-radius: 0.4rem">
            {{ menu.name }}
          </a-menu-item>
        </a-menu>
        <PlusOutlined class="header-item-icon"/>

        <!-- 启动台 -->
        <AppstoreFilled class="header-item-icon"/>
        <div class="header-item-avatar">
          avatar
        </div>
      </n-layout-header>
      <n-layout-content style="height: calc(100vh - 3rem); overflow: auto;">
        <div style="background: #fff; padding: 24px;">
          Content
          <div v-for="i in 100">
            {{ i }}
          </div>
        </div>
      </n-layout-content>
    </n-layout>

  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue';
import {AppstoreFilled, PlusOutlined} from "@ant-design/icons-vue";

const selectedKeys = ref<number[]>([0]);

// 顶部菜单
interface HeaderMenu {
  name: string,
  value: number,
  order: number,
}

const headerMenuList = ref<HeaderMenu[]>([{
  name: '照片',
  value: 1,
  order: 0,
}, {
  name: '电影',
  value: 2,
  order: 1,
},
])

</script>


<style lang="scss" scoped>
//:deep(.full-modal) {
//  .ant-modal {
//    width: 100vw !important;
//    max-width: 100vw !important;
//    top: 0;
//    padding-bottom: 0;
//    margin: 0;
//  }
//
//  .ant-modal-content {
//    display: flex;
//    flex-direction: column;
//    height: calc(100vh);
//  }
//
//  .ant-modal-body {
//    flex: 1;
//  }
//}

.start-menu {
  display: grid;
  //width: 17rem;
  grid-template-columns: 33% 33% 33%;
  gap: 1rem;
}

.layout-header-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 1rem;
  padding: 0 1rem;
  height: 3rem;
  //background-color: #535bf2;
}

.header-item-icon {
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
}

.header-item-avatar {
  border-radius: 100%;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid white;
  color: white;
  line-height: 2.5rem;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
