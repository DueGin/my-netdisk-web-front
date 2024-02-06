<template>
  <a-map
      :key="mapKey"
      :info-window-render="infoWindow"
      :marker-icon="markerIcon"
      :points="points"
      :data="data"
  />
</template>

<script setup lang="ts">
import AMap from "@/components/map/AMap.vue";
import {onActivated, ref} from "vue";
import {getAMapList} from "@/apis/amap/AMapApi.ts";

const infoWindow = `<div>fwmefiwem</div>`;

const markerIcon = `<div style="border-radius: 100%;width: 10px;height: 10px; background-color: rgba(255,0,0,0.3)"/>`;

let points = ref([]);
const data = ref([]);
const handlePoint = (resolve) => {
  let ps = [];
  for (let i = 0; i < data.value.length; i++) {
    let p = data.value[i];
    let point = {
      lnglat: [p.longitude, p.latitude],
      extData: {
        url: p.url,
        name: p.fileName,
      }
    }
    ps.push(point);
    if(i === data.value.length - 1){
      points.value = ps;
      resolve()
    }
  }
}


const getList = () => {
  return getAMapList().then(res => {
    if (res.data) {
      data.value = res.data;
    }
  })
}

const mapKey = ref(0);
onActivated(async () => {
  console.log("map activated")
  getList().then(() => {
    new Promise(resolve => {
      handlePoint(resolve)
    }).then(() => {
      mapKey.value++;
    })
  });

})


</script>

<style scoped>

</style>
