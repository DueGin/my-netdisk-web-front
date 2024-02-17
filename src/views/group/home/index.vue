<template>
  <div class="app-container">
    <!--列表卡片列出加入的组，没有的就提示创建组-->
    <n-list hoverable clickable>
      <template #header>
        <div style="display: flex; align-items: center;justify-content: space-between;">
          <n-tabs
              type="line"
              animated
              v-model:value="tabsValue"
              style="padding-left: .3rem;"
              @update:value="getGroupList"
          >
            <n-tab :name="GroupConstant.ALL">全部</n-tab>
            <n-tab :name="GroupConstant.CREATED">我创建的</n-tab>
          </n-tabs>
          <div style="display: flex; column-gap: 1rem">
            <n-button type="primary" @click="clickEnterGroup">加入组</n-button>
            <n-button type="primary" @click="clickCreateGroup">创建组</n-button>
          </div>
        </div>
      </template>
      <n-list-item v-for="item in groupList" @click="handleItemClick(item)">
        {{ item.groupName }}
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup lang="ts">
import {h, ref} from "vue";
import {getUserGroupList} from "@/apis/group/GroupApi.ts";
import {GroupConstant} from "@/constants/GroupConstant.ts";
import {useDialog} from 'naive-ui';
import router from "@/router";
import AddGroupForm from "@/views/group/components/AddGroupForm.vue";


// 用户已加入组的列表
const groupList = ref<Group[]>([]);
const getList = () => {
  getUserGroupList().then(res => {
    if (res.code === 200 && res.data) {
      groupList.value = res.data
    }
  })
}
getList();

// 列表item点击
const handleItemClick = (item) => {
  console.log(item)
  router.push({
    path: '/group/info',
    query: {groupId: item.id}
  })
}


// 标签页
const tabsValue = ref(GroupConstant.ALL)
const getGroupList = () => {
  console.log("switch tabs")
}

// 加入资源组
const clickEnterGroup = () => {
  console.log("click enter group")
}

const dialog = useDialog();

// 创建资源组
const clickCreateGroup = () => {
  // 弹窗添加组页面
  console.log("click create group")
  dialog.create({
    title: '新增资源组',
    content: () => h(AddGroupForm, {
      onSubmitCallback: () => {
        getList();
        dialog.destroyAll()
      }
    }),
  })

}


</script>

<style scoped>

</style>
