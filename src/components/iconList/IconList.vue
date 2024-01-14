<template>
  <div>
    <n-icon size="2rem" v-for="item in iconList" @click="$emit('update:selectValue')" :class="{selected: item === selectValue}">
      <Icon :icon="item"/>
    </n-icon>
  </div>
</template>

<script setup lang="ts">
import {ref, h} from "vue";
import {Icon} from "@iconify/vue";

defineProps({
  selectValue:{
    type: String
  }
})

const iconList = ref([]);
const getIconList = ()=>{

}

</script>

<style scoped>
.selected{
  background-color: rgba(136, 136, 136, 0.59);
}
</style>
