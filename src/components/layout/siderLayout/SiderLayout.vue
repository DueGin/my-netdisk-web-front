<template>
  <n-space style="display: unset">
    <n-layout sider-placement="left" has-sider>
      <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          width="12rem"
          :native-scrollbar="false"
          style="height: calc(100vh - 3rem);"
      >
        <n-menu
            ref="siderMenuRef"
            v-model:value="selectKey"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="siderMenuOptions"
            accordion
        />
      </n-layout-sider>
      <n-layout-content content-style="height: calc(100vh - 3rem); overflow: auto;">
        <router-view v-if="isUseRouter" v-slot="{Component}">
          <keep-alive>
            <Component :is="Component"/>
          </keep-alive>
        </router-view>
        <slot name="content" v-if="!isUseRouter"/>
      </n-layout-content>
    </n-layout>
  </n-space>
</template>


<script lang="ts" setup>
import {ref, watch} from "vue";
import {getMenuListByType} from "@/apis/menu/menuApi.ts";
import {renderIcon} from "@/utils/render/IconRender.ts";
import {useRoute} from "vue-router";
import {renderLinkTextWithPath} from "@/utils/render/RouterLinkRender.ts";
import {MenuInst} from 'naive-ui'
import router from "@/router";
import {useMenuStore} from "@/store/menuStore/MenuStore.ts";

const props = defineProps({
  // 可以在router-view或者slot中做选择。isUseRouter=true，表示启动router-view，关闭slot
  isUseRouter: {
    type: Boolean,
    default: false
  },
})


// 获取菜单值
const siderMenuOptions = ref([])
const getMenuByType = (type: number) => {
  getMenuListByType(type).then(res => {
    if (res.code === 200 && res.data) {
      // 处理菜单
      res.data.forEach(handleMenuIcon)
      siderMenuOptions.value = res.data
      console.log(siderMenuOptions)
    }
  })
}

// 处理菜单
const handleMenuIcon = (m) => {
  m.label = renderLinkTextWithPath(m.path, m.name)
  let split = m.path.split('/');
  m.key = split[2];

  // 处理icon
  if (m.icon && typeof m.icon === "string") {
    let t = m.icon
    m.icon = renderIcon(t)
  }

  // 递归处理子菜单
  if (m.childrenList) {
    m.childrenList.forEach(handleMenuIcon)
  }
}


// 监听路由值，获取菜单列表，手动高亮菜单值
const route = useRoute();
const siderMenuRef = ref<MenuInst | null>(null)
const selectKey = ref('')
const menuStore = useMenuStore();

const handleHighlightMenu = (menuKey) => {
  selectKey.value = menuKey
  console.log(siderMenuRef.value)
  siderMenuRef.value?.showOption(menuKey)
}

const handleMenu = async () => {

  if (route.path) {
    let split = route.path.split('/');
    let menuName = split[1];

    let menuValue = menuStore.menuMap[menuName];

    menuValue.forEach(handleMenuIcon)
    siderMenuOptions.value = menuValue;
    // await getMenuByType(menuValue);
    let menuKey = split[split.length - 1];
    handleHighlightMenu(menuKey);
  }
}


watch(() => router.currentRoute.value.path, (from, to) => {
  handleMenu()
}, {immediate: true})


</script>

<style scoped>

</style>
