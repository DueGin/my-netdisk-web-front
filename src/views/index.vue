<template>
  <div class="app-container">
<!--    <div>-->
<!--      <h2>精选推荐</h2>-->
<!--      <gin-piece>-->
<!--        哈哈哈-->
<!--      </gin-piece>-->
<!--    </div>-->
主页功能展示搁置，点击右上角菜单进入媒体管理页面
<!--    <div>-->
<!--      <h2>那年今天</h2>-->
<!--      <gin-piece v-if="thatYearTodayList && thatYearTodayList.length !== 0">-->
<!--        <n-carousel dot-type="line" autoplay mousewheel draggable>-->
<!--          <n-image-->
<!--              v-for="item in thatYearTodayList"-->
<!--              :key="item.id"-->
<!--              :src="item.url"-->
<!--              object-fit="cover"-->
<!--              width="100%"-->
<!--              height="100%"-->
<!--              preview-disabled-->
<!--              style="height: 100%; width: 100%;"-->
<!--          />-->
<!--        </n-carousel>-->
<!--      </gin-piece>-->
<!--      <div v-else>暂无当天的往年照片，快去多拍点照片，上传到系统吧！</div>-->
<!--    </div>-->

  </div>
</template>

<script setup lang="ts">
import {getThatYearToday} from "@/apis/media/MediaApi.ts";
import {ref} from "vue";

let size = 3;
const thatYearTodayList = ref([]);
const getList = () => {
  getThatYearToday(size).then(res => {
    if (res.data) {
      thatYearTodayList.value = res.data;
    }
  })
}
getList();
</script>

<style scoped>

</style>
