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

// 处理菜单
const handleMenuIcon = (m, deepHeight) => {
  // 需要隐藏的就不处理了
  if (m.hidden === 1) {
    return false;
  }
  if (m.path && m.path !== '' && m.componentPath && m.componentPath !== '') {
    m.label = () => renderLinkTextWithPath(m.path, m.name)
  } else {
    m.label = m.name;
  }
  let split = m.path.split('/');
  m.key = split[deepHeight];

  // 处理icon
  if (m.icon && typeof m.icon === "string") {
    let t = m.icon
    m.icon = () => renderIcon(t)
  }

  // 递归处理子菜单
  if (m.children && m.children.length !== 0) {
    let count = 0;
    for (let i = 0; i < m.children.length; i++) {
      let child = m.children[i];
      let b = handleMenuIcon(child, deepHeight + 1);
      if (!b) {
        m.children.splice(i, 1);
        i--;
        count++;
      }
    }
    if (m.children.length === 0) {
      m.children = undefined;
    }
  } else {
    m.children = undefined
  }
  return true;
}


// 监听路由值，获取菜单列表，手动高亮菜单值
const route = useRoute();
const siderMenuRef = ref<MenuInst | null>(null)
const selectKey = ref('')
const menuStore = useMenuStore();

const handleHighlightMenu = (menuKey) => {
  selectKey.value = menuKey
  console.log(menuKey)
  siderMenuRef.value?.showOption(menuKey)
}

/**
 * 寻找高亮菜单key，从子路径往父找
 * @param menu 菜单列表
 * @param menuKey 需要的key
 * @param deepHeight 当前路由深度
 * @param needDeepHeight 需要的路由深度
 */
const handleFindHighlightMenuKey = (menu, menuKey, deepHeight, needDeepHeight) => {

  function handle(m, menuKey, deepHeight, needDeepHeight) {
    if (m.children) {
      for (let j = 0; j < m.children.length; j++) {
        let c = m.children[j];
        let mKey = handle(c, menuKey, deepHeight + 1, needDeepHeight);
        if (mKey) {
          return mKey;
        }
      }
    }

    if (m.key === menuKey && deepHeight === needDeepHeight) {
      return m.key;
    }
  }

  for (let i = 0; i < menu.length; i++) {
    let m = menu[i];
    let mKey = handle(m, menuKey, deepHeight + 1, needDeepHeight);
    if (mKey) {
      return mKey;
    }
  }

}

const handleMenu = async () => {

  if (route.path) {
    let split = route.path.split('/');
    let menuName = split[1];
    console.log("路由菜单名称", menuName)
    let menuValue;
    await menuStore.getMenuMap().then(res => {
      menuValue = res[menuName];
    })
    console.log('菜单名称：' + menuName + '，菜单列表：', menuValue)
    menuValue.forEach(m => handleMenuIcon(m, 2))
    siderMenuOptions.value = menuValue;
    // 从子往父级找能高亮的菜单
    let menuKey;
    console.log(split)
    for (let i = 0; i < split.length; i++) {
      let deepHeight = split.length - i - 1;
      menuKey = split[deepHeight];
      let find = handleFindHighlightMenuKey(menuValue, menuKey, 1, deepHeight);
      if (find) {
        menuKey = find;
        break;
      }
    }
    handleHighlightMenu(menuKey);
  }
}


watch(() => router.currentRoute.value.path, (from, to) => {
  handleMenu()
}, {immediate: true})


</script>

<style scoped>

</style>
