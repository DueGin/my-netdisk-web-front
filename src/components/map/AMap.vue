<template>
  <div id="container"></div>
</template>
<script setup>
import {onMounted, reactive, ref, getCurrentInstance, render} from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import {shallowRef} from 'vue'
import {coordData} from './data'
import {getLongitudeLatitude} from "@/utils/geo/GeoUtil.ts";

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  infoWindowRender: {
    type:render,
    default: `<div>请设置信息弹窗</div>`
  },
  markerIcon:{
    type:render,
    default: `<div style="border-radius: 100%;width: 20px;height: 20px; background-color: rgba(255,0,0,0.4)"></div>`
  }
})

const map = shallowRef(null)
const {ctx} = getCurrentInstance()
const _this = ctx

// const menuInstance = ref() // menu 实例
let AMap = ref() // map 实例
let currentPonit = ref < HTMLElement | null > (null) // 存储当前选中点 DOM
let currentData = reactive({}) // 当前选重点信息
let sourceInfoWindow = ref()

const headColors = ['#3366bb', '#6622FF']
// 工具方法
// 修改DOM 类名
function changeStyle(res, data) {
  if (currentPonit.value !== null) {
    currentPonit.value.classList.remove('active')
  }
  currentPonit.value = res.children[0]
  currentData = data
  currentPonit.value.classList.add('active')
}

// 清除点信息
function clearPoint() {
  if (currentPonit.value) {
    currentPonit.value.classList.remove('active')
  }
  currentPonit.value = null
  currentData = {}
}

function markerClick(e) {
  console.log('sourceInfoWindow.value', sourceInfoWindow.value, e.target)

  sourceInfoWindow.value.setContent(e.target.infoWindow)
  sourceInfoWindow.value.open(map.value, e.target.getPosition())
}


const initWindow = () => {
  // 信息窗体
  let infoWindow = new AMap.value.InfoWindow({
    offset: new AMap.value.Pixel(0, -10),
    retainWhenClose: true,
  })
  sourceInfoWindow.value = infoWindow
  // 信息窗口打开时
  infoWindow.on('open', function (...arg) {
    console.log("信息窗口打开了")
  })
}

// 抽离点位信息设置
function setMarker(marker) {

  // 点标记图标
  let icon = `<div style="border-radius: 100%;width: 20px;height: 20px; background-color: red"></div>`
  let markerd = new AMap.value.Marker({
    map: map.value,
    content: props.markerIcon,
    offset: new AMap.value.Pixel(-8, -8),
    visible: true, // 点标记是否可见
    position: [marker.position[0], marker.position[1]],
  })

  // 点击标点后，后面读取
  markerd.infoWindow = props.infoWindowRender
  markerd.extData = marker
  markerd.on('click', markerClick)
  if (marker.name === '新疆') {
    // 触发上面的点击事件
    markerd.emit('click', {target: markerd})
  }

  return markerd
}


const initMap = () => {
  AMapLoader.load({
    key: 'b59c490f61a694b9d7576dd864f74d6e', // 申请好的Web端开发者Key，首次调用 load 时必填 todo 如何保存
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.MouseTool'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    Loca: {
      version: '2.0.0'
    }
  })
      .then((res) => {
        AMap.value = res
        // 上来就显示的中心点  北京 116.397, 39.918
        let lnglat = new res.LngLat(140, 40)
        map.value = new res.Map('container', {
          //设置地图容器id
          viewMode: '3D', //是否为3D地图模式
          zoom: 5, //初始化地图级别
          center: lnglat, //初始化地图中心点位置
        })
        map.value.clearMap() // 清除地图覆盖物
        // 地图是否可拖拽和缩放
        map.value.setStatus({
          dragEnable: true, // 是否可拖拽
          zoomEnable: true, // 是否可缩放
        })

        initWindow()
        // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
        props.data.forEach(function (marker) {
          console.log(marker)
          setMarker(marker)
        })

        //修改图例排列方式
        document.getElementsByClassName("amap-loca loca-controls")[0].setAttribute('id', 'testid')
        let lis = document.querySelectorAll("#testid li");
        for (let i = 0; i < lis.length; i++) {
          console.log(lis[i]);
          lis[i].setAttribute("class", 'test'
          );
        }
      })
      .catch((e) => {
        console.log('error', e)
      })
}


onMounted(() => {
  initMap()
})
</script>
<style lang="scss">
#container {
  width: 1350px;
  height: 900px;
}

#root {
  display: flex;
  width: 100%;
}

#root > div:first-child {
  width: 200px;
  margin-right: 10px;
  padding: 5px;
  box-shadow: 2px 2px 2px 2px #333;
}

#root > div:first-child {
  display: flex;
  flex-direction: column;
}

.context_menu {
  position: relative;
  min-width: 12rem;
  padding: 0;
  background-color: white;
}

.context_menu p {
  cursor: pointer;
  padding: 0.25rem 1.25rem;
}

.context_menu p:hover {
  background: #ccc;
}

.btn {
  width: 80px;
  margin-top: 10px;
}

.marker-route {
  width: 15px;
  height: 15px;
  background-color: #22ddb8;
  border-radius: 10px;
}

.active {
  background-color: #f76809;
}

.content {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1px;
  color: white;
  display: flex;
  align-items: center;
}

.content span {
  display: block;
  width: 20px;
  height: 20px;
  background-color: #3366bb;
  margin: 0 10px;
}

.content p {
  margin-right: 10px;
}

.test {
  height: 30px;
  box-sizing: content-box;
  padding: 2px 10px;
  line-height: 30px;
  display: inline;
  float: left;
}

.test a {
  color: #333 !important;
}

.test span {
  width: 80px !important;
  margin-left: 10px;
  border-radius: 10px;
}

.amap-info-content {
  background-color: rgba(255, 255, 255, 0.6);
}

.test_container {
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  width: 180px;
  flex-direction: column;
  padding: 10px 18px 10px 10px;
  line-height: 1.4;
  overflow: auto;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.input_inner {
  margin-right: 5px;
  border: 1px solid #333;
  border-radius: 2px;
  width: 30px;
}
</style>

