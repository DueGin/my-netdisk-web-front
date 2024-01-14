<template>
  <div class="app-container">
    <n-form ref="formRef" :model="groupInfo">
      <n-form-item label="图标和名称">
        <n-dropdown trigger="click" :options="options">
          <n-button>
            <Icon :icon="groupInfo.icon"/>
          </n-button>
        </n-dropdown>
        <n-input v-model:value="groupInfo.groupName" placeholder="请输入资源组名称"/>
      </n-form-item>
      <n-form-item label="简介">
        <n-input type="textarea" v-model:value="groupInfo.description"/>
      </n-form-item>
      <n-form-item>
        <n-button @click="clickSave">保存</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {watch, ref, h} from "vue";
import {Icon} from "@iconify/vue";
import IconList from "@/components/iconList/IconList.vue";
import {getGroupInfoById, updateGroupInfo} from "@/apis/group/GroupRequest.ts";
import {notification} from "@/utils/tip/TipUtil.ts";

const route = useRoute();


interface GroupInfoForm {
  icon: any,
  groupName: any,
  description: any,
}

const groupInfo = ref<GroupInfoForm>({
  icon: undefined,
  description: undefined,
  groupName: undefined
});
// 获取组信息详情
const getGroupInfo = (groupId) => {
  getGroupInfoById(groupId).then(res => {
    console.log(res)
    if (res.code === 200 && res.data) {
      groupInfo.value = res.data
    }
  })
}

let groupId = null;
// 接收groupId
watch(() => route.query, (to, from) => {
  console.log(from, to)
  if (to && to.groupId) {
    console.log(to.groupId)
    groupId = to.groupId
    getGroupInfo(to.groupId);
  }
}, {immediate: true})


const iconList = [];
const getIconList = () => {
}

const options = [{
  key: "key",
  type: "render",
  render: () => h(
      IconList,
      {
        selectValue: groupInfo.value.icon,
        ['onUpdate:selectValue']: v => {
          groupInfo.value.icon = v
        }
      }
  )
}];

const clickSave = () => {
  groupInfo.value.createTime = undefined;
  groupInfo.value.updateTime = undefined;

  updateGroupInfo(groupInfo.value).then(res => {
    if (res.code === 200) {
      notification.success({
        title: "保存成功",
        duration: 1000
      })
    }
  })
}


</script>

<style scoped>

</style>
