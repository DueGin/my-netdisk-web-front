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
import {getMenuListByType} from "@/apis/menu/menuRequest.ts";
import {renderIcon} from "@/utils/render/IconRender.ts";
import Menu from "@/model/menu/Menu.ts";
import {useRoute} from "vue-router";
import {renderLinkText} from "@/utils/render/RouterLinkRender.ts";
import {MenuInst} from 'naive-ui'
import router from "@/router";

const props = defineProps({
  // 可以在router-view或者slot中做选择。isUseRouter=true，表示启动router-view，关闭slot
  isUseRouter: {
    type: Boolean,
    default: false
  },
})

// 监听路由值，手动高亮菜单值
const route = useRoute();
const siderMenuRef = ref<MenuInst | null>(null)
const selectKey = ref('')
const handleHighlightMenu = () => {
  console.log(route.path);
  if (route.path) {
    let split = route.path.split('/');
    let menu = split[split.length - 1];
    console.log(menu)
    selectKey.value = menu
    siderMenuRef.value?.showOption(menu)
  }
}


watch(() => router.currentRoute.value.path, (from, to) => {
  console.log(from, to)
  handleHighlightMenu()
}, {immediate: true})


// 获取菜单值
const siderMenuOptions = ref([])
getMenuListByType('media').then(res => {
  if (res.code === 200 && res.data) {
    // 处理菜单
    res.data.forEach(handleMenu)
    siderMenuOptions.value = res.data
    console.log(siderMenuOptions)
  }
})

// 处理菜单
const handleMenu = (m: Menu) => {
  m.label = renderLinkText(m.pathName, m.label)
  // 处理icon
  if (m.icon && typeof m.icon === "string") {
    let t = m.icon
    m.icon = renderIcon(t)
  }

  // 递归处理子菜单
  if (m.children) {
    m.children.forEach(m1 => {
      handleMenu(m1)
    })
  }
}


</script>

<style scoped>

</style>
