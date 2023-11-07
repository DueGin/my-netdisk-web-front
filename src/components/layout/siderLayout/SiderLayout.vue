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
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            accordion
        />
      </n-layout-sider>
      <n-layout-content
          content-style="height: calc(100vh - 3rem); overflow: auto;"
      >
        <router-view v-if="isUseRouter"/>
        <slot name="content" v-if="!isUseRouter"/>
      </n-layout-content>
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>

import {h, ref} from "vue";
import {NIcon} from "naive-ui";
import {Icon} from "@iconify/vue";
import {getMenuListByType} from "@/apis/menu/menuRequest.ts";
import {RouterLink} from "vue-router";

const props = defineProps({
  isUseRouter: {
    type: Boolean,
    default: false
  },
})

function renderIcon(icon: string) {
  return () => h(NIcon, null, {default: () => h(Icon, {icon: icon})})
}


// 获取菜单值
let menuOptions = ref([])
getMenuListByType('media').then(res => {
  res.forEach(t => handleIcon(t))
  menuOptions.value = res
  console.log(menuOptions)
})

const handleIcon = (m) => {
  // 处理路由
  let l = m.label
  m.label = ()=> h(
      RouterLink,
      {
        to: {
          name: m.pathName,
          params: {
            lang: 'zh-CN'
          }
        }
      },
      { default: () => l }
  )

  // 处理icon
  if (m.icon && typeof m.icon === "string") {
    let t = m.icon
    m.icon = renderIcon(t)
  }

  // 递归处理子菜单
  if (m.children) {
    m.children.forEach(m1 => {
      handleIcon(m1)
    })
  }
}


// const menuOptions = [
//   {
//     label: '首页',
//     key: 'home',
//     icon: renderIcon('tdesign:home')
//   },
//   {
//     label: '照片',
//     key: 'photo',
//     icon: renderIcon('tabler:photo'),
//     disabled: false,
//
//   },
//   {
//     label: '视频',
//     key: 'a-wild-sheep-chase',
//     disabled: true,
//     icon: renderIcon('majesticons:video-line')
//   },
//   {
//     label: '电影',
//     key: 'dance-dance-dance',
//     icon: renderIcon('mingcute:movie-line'),
//     children: [
//       {
//         type: 'group',
//         label: '人物',
//         key: 'people',
//         children: [
//           {
//             label: '叙事者',
//             key: 'narrator',
//             // icon: renderIcon(PersonIcon)
//           },
//           {
//             label: '羊男',
//             key: 'sheep-man',
//             // icon: renderIcon(PersonIcon)
//           }
//         ]
//       },
//       {
//         label: '饮品',
//         key: 'beverage',
//         // icon: renderIcon(WineIcon),
//         children: [
//           {
//             label: '威士忌',
//             key: 'whisky'
//           }
//         ]
//       },
//       {
//         label: '食物',
//         key: 'food',
//         children: [
//           {
//             label: '三明治',
//             key: 'sandwich'
//           }
//         ]
//       },
//       {
//         label: '过去增多，未来减少',
//         key: 'the-past-increases-the-future-recedes'
//       }
//     ]
//   }
// ]
</script>

<style scoped>

</style>
