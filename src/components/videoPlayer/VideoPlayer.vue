<template>
  <video class="video-shower"
         :src="src"
         @click="showDialog"
         :controls="isUseControls"
  >
    您的浏览器不支持 video 标签。
  </video>
</template>

<script setup lang="ts">
import {h} from "vue";
import {useDialog} from 'naive-ui'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  isUseDialog: {
    type: Boolean,
    default: true
  },
  isUseControls: {
    type: Boolean,
    default: false
  },
})


const dialog = useDialog()

const showDialog = () => {
  if(!props.isUseDialog){
    return;
  }
  dialog.create({
    content: () => h('video', {
      src: props.src,
      controls: true,
      style:{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }
    }),
    style: {
      width: 'unset',
    },
    showIcon: false

  })
}

</script>

<style scoped>
.video-shower {
  object-fit: cover;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

</style>
