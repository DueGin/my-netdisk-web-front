<template>
  <n-select
      v-model:value="value"
      :options="iconOptions"
      :loading="loading"
      remote
      filterable
      @scroll="onScroll"
      @search="onSearch"
      placeholder="请输入图标名称搜索"
      clearable
  />
</template>

<script setup lang="ts">
import {getIconPage} from "@/apis/icon/IconApi.ts";
import {h, ref} from "vue";
import {NIcon} from "naive-ui";
import {Icon} from "@iconify/vue";

const value = defineModel<string>('value', {default: ''})

// 图标选项列表
let size = 32;
let start = 0;
let iconQueryName;
const iconOptions = ref([]);
const loading = ref(false);

const getIcons = () => {
  return getIconPage(iconQueryName, start, size).then(res => {
    if (res.icons) {
      let icons = [];
      for (let i = 0; i < res.icons.length; i++) {
        let icon = {
          label: () => h(NIcon, {size: '30px'}, {
            default: () => h(Icon, {
              icon: res.icons[i]
            })
          }),
          value: res.icons[i]
        }
        icons.push(icon);
      }
      if (start === 0) {
        iconOptions.value = icons
      } else {
        iconOptions.value = iconOptions.value.concat(icons)
      }
    }
  }).finally(() => loading.value = false)
}

/**
 * 处理滚动
 * @param e ScrollEvent
 */
const onScroll = (e) => {
  const currentTarget = e.currentTarget as HTMLElement;
  let oldScrollTop = currentTarget.scrollTop
  // console.log(currentTarget.scrollTop, currentTarget.offsetHeight, currentTarget.scrollHeight)
  if (currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight - 50) {
    // console.log("update")
    start += size;
    getIcons().then(() => {
      // console.log('end', currentTarget.scrollTop)
      currentTarget.scrollTop = oldScrollTop
    })

  }
}

/**
 * 处理搜索，默认800毫秒防抖
 * @param query
 */
let searchTimer;
const onSearch = (query: string) => {
  start = 0;
  iconQueryName = query;
  loading.value = true;
  if (searchTimer) {
    clearTimeout(searchTimer);
  }
  searchTimer = setTimeout(() => {
    getIcons();
  }, 800)

}


</script>

<style scoped>

</style>
