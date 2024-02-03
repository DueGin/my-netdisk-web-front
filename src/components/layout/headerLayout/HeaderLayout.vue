<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header class="header-container" :inverted="false" bordered>
        <n-menu mode="horizontal" :inverted="false" :options="headerMenuOptions"/>
        <n-dropdown trigger="hover" :options="startMenu">
          <n-icon size="1.6rem" style="cursor: pointer;">
            <Icon icon="ion:apps"/>
          </n-icon>
        </n-dropdown>
        <n-dropdown trigger="click" :options="avatarMenuOptions" @select="handleAvatarMenuSelect">
          <n-avatar
              class="avatar"
              style="color: black; background-color: unset;cursor:pointer; border-radius: 5px"
              :src="user && user.avatarUrl ? user.avatarUrl : ''"
          >
            <n-icon v-if="!user || (user && (!user.avatar || user.avatar === ''))">
              <Icon icon="pajamas:twitter"/>
            </n-icon>
          </n-avatar>
        </n-dropdown>
      </n-layout-header>
      <n-layout-content>
        <router-view v-if="isUseRouter"/>
        <slot name="content" v-if="!isUseRouter"/>
      </n-layout-content>
    </n-layout>
  </n-space>
</template>


<script setup lang="ts">
import {h, ref} from 'vue';
import {NIcon} from 'naive-ui'
import StartMenu from "@/components/startMenu/StartMenu.vue";
import {Icon} from "@iconify/vue";
import Menu from "@/model/menu/Menu.ts";
import {logout} from "@/apis/user/userApi.ts";
import router from "@/router";
import {useMainStore} from "@/store/store.ts";

const props = defineProps({
  isUseRouter: {
    type: Boolean,
    default: false
  },
})


// 启动台
const startMenu = [
  {
    key: 'header',
    type: 'render',
    render: () => h(StartMenu),
  }
]

// 顶部菜单
const headerMenuOptions = ref<Menu[]>([])


////// 头像下拉菜单 //////
const avatarMenuOptions = ref([
  {
    label: '帐号设置',
    key: 1,
  },
  {
    label: '退出登录',
    key: 2
  }
])

// 处理头像下拉菜单选择项
const handleAvatarMenuSelect = (key: string | number) => {
  switch (key) {
    case 1:
      // 跳转账户设置页面
      console.log('navigate to user settings');
      router.push({name: 'UserCenter'});
      break;
    case 2:
      handleLogout()
      break;
  }
}

// 退出登录
const handleLogout = () => {
  console.log('logout')
  logout().then(res => {
    localStorage.removeItem("token");
    router.push({name: 'Login'});
  })
}

const mainStore = useMainStore();
const user = ref(mainStore.user);

</script>


<style lang="scss" scoped>
.header-container {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 1rem;
  padding: 0 1rem;
}

.avatar {
  width: 2.4rem;
  height: 2.4rem;
}

</style>
