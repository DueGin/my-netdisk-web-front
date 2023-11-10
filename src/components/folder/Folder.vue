<template>
  <div class="folder">
    <div class="f-icon" @click="$emit('clickFolder')">
      <n-icon size="5rem">
        <Icon icon="ion:folder" color="#444444"/>
      </n-icon>
    </div>
    <div style="user-select: none !important;">{{folderName}}</div>
  </div>
</template>

<script setup lang="ts">
import {Icon} from "@iconify/vue";

const props = defineProps({
  folderName: {
    type: String,
    default: '文件夹'
  },
})

</script>

<style scoped>

.folder{
  width: 7rem;
  height: 6.5rem;
  display: grid;
  grid-template-rows: 5rem 1.5rem;
  align-items: center;
  justify-items: center;
  box-sizing: border-box;
  position: relative;
  float: left;
}

.f-icon {
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.f-icon:hover{
  border: 1px solid #444444;
  border-radius: .5rem;
  //background-color: #888888;
  cursor: pointer;

}
</style>
