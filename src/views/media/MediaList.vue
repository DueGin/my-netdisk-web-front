<template>
  <div class="app-container">
    <div class="media-container">
      <div v-for="item in mediaList" class="media-item">
        <n-image
            :src="item.src"
            style="width: 8rem; height: 8rem;"
            lazy
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const mediaList = [
  {
    type: 'photo',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },{
    type: 'photo',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },{
    type: 'photo',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },{
    type: 'photo',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },{
    type: 'photo',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },{
    type: 'photo',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },{
    type: 'photo',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },{
    type: 'photo',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
]

</script>

<style scoped>
.media-container{
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.media-item{
  border-radius: 0.5rem;
  overflow: hidden;
  width: 8rem;
  height: 8rem;
  box-sizing: border-box;
}

.media-item:hover{
  border: 1px solid rgba(136, 136, 136, 0.74);
}
</style>
