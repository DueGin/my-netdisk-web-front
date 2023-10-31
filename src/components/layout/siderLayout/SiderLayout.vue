<template>
  <div>
    <n-space>
      <n-layout sider-placement="left" has-sider>
        <n-layout-sider
            bordered
            show-trigger
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :native-scrollbar="false"
            style="height: calc(100vh - 3rem);top: 3rem;"
        >
          <n-menu
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout-content content-style="padding: 2rem; height: 100vh; overflow: auto;">
        <slot name="content"/>
      </n-layout-content>
      </n-layout>
    </n-space>
  </div>
</template>

<script lang="ts" setup>

import {Component, h} from "vue";
import {NIcon} from "naive-ui";
import {BookOutline as BookIcon, PersonOutline as PersonIcon, WineOutline as WineIcon} from '@vicons/ionicons5';


function renderIcon(icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)})
}


const menuOptions = [
  {
    label: '首页',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: '照片',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: false,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '视频',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
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

<style scoped>

</style>
