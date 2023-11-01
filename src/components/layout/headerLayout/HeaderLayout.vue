<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header class="header-container" :inverted="false" bordered>
        <n-menu mode="horizontal" :inverted="false" :options="menuOptions"/>
        <n-dropdown trigger="hover" :options="startMenu">
          <n-icon size="1.6rem" style="cursor: pointer;">
            <Icon icon="ion:apps"/>
          </n-icon>
        </n-dropdown>
        <div class="avatar">
          avatar
        </div>
      </n-layout-header>
      <n-layout-content>
        <router-view v-if="isUseRouter"/>
        <slot name="content" v-if="!isUseRouter"/>
      </n-layout-content>
    </n-layout>
  </n-space>
</template>


<script setup lang="ts">
import {Component, h} from 'vue';
import {NIcon} from 'naive-ui'
import StartMenu from "@/components/startMenu/StartMenu.vue";
import {Icon} from "@iconify/vue";

const props = defineProps({
  isUseRouter: {
    type: Boolean,
    default: false
  },
})

function renderIcon(icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)})
}


// 启动台
const startMenu = [
  {
    key: 'header',
    type: 'render',
    render: () => {
      return h(StartMenu, {}, {})
    },
  }
]

// 顶部菜单
const menuOptions = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    // icon: renderIcon(BookIcon)
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    // icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: false,
    // icon: renderIcon(BookIcon),
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    // icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            // icon: renderIcon(PersonIcon)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            // icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        // icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]

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
  border-radius: 100%;
  border: 1px solid black;
  text-align: center;
  line-height: 2.4rem;
}

</style>
