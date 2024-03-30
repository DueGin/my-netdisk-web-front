<template>
  <div id="container"></div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const props = defineProps({
  points: {
    type: Array,
    default: []
  },
  data: {
    type: Array,
    default: []
  },
  clusterMarkerInfoWindowHtml: {
    type: String,
    default: `<div>请设置信息弹窗</div>`,
  },
  markerInfoWindowHtml: {
    type: String,
    default: `<div>请设置信息弹窗</div>`,
  },
  // markerIcon: {
  //   type: String,
  //   default: `<div style="border-radius: 100%;width: 20px;height: 20px; background-color: rgba(255,0,0,0.4)"/>`,
  //   required: false
  // },
})

let map = null
// const {ctx} = getCurrentInstance()
// const _this = ctx
// console.log(ctx)

let aMap = null // map 实例
let sourceInfoWindow = ref()


function markerClick(e, marker) {
  console.log('sourceInfoWindow.value', sourceInfoWindow.value, e.target, marker)

  // sourceInfoWindow.value.setContent(e.target.infoWindow)
  sourceInfoWindow.value.setContent(props.markerInfoWindowHtml)
  sourceInfoWindow.value.open(map, marker.getPosition())
}


const initWindow = () => {
  // 信息窗体
  let infoWindow = new aMap.InfoWindow({
    offset: new aMap.Pixel(10, -50), // 偏移量 x, y
    retainWhenClose: true,
  })
  sourceInfoWindow.value = infoWindow
  // 信息窗口打开时
  infoWindow.on('open', function (...arg) {
    console.log("信息窗口打开了")
  })
}


// 聚合点样式
const _renderClusterMarker = function (context) {
  //context 为回调参数，
  //包含如下属性 marker:当前聚合点，count:当前聚合点内的点数量
  let clusterCount = context.count; //聚合点内点数量
  let firstData = context.clusterData[0].extData;
  let marker = context.marker;
  marker.setOffset(new aMap.Pixel(0, 0));

  console.log('聚合', context, firstData)
  // context.marker.setContent('<div style="background-color:#00ff00">' + clusterCount + "</div>");
  context.marker.setContent(`
  <img style="width: 50px;height: 50px;border-radius: 5px;border: 2px solid rgba(255,255,255,0.49)" src="${firstData.url}" alt="无法加载相片">
    <div class="clusterMarkerCount">
      ${clusterCount}
    </div>
  </img>
`);

};
// 非聚合点样式
const _renderMarker = function (context) {
  //context 为回调参数，
  //包含如下属性 marker:当前非聚合点
  // context.marker.setContent('<div style="background-color:#ff0000">1</div>');
  // context.marker.setContent(props.markerIcon);
  let data = context.data[0].extData;
  let marker = context.marker;

  console.log('非聚合', context, data)

  context.marker.setContent(`<img style="width: 50px;height: 50px;border-radius: 5px;border: 2px solid rgba(255,255,255,0.49)" src="${data.url}" alt="无法加载相片"/>`);
  context.marker.on('click', (e) => markerClick(e, marker))
  marker.extData = context.data[0]
};


// 抽离点位信息设置
/*function setMarker(marker) {

  // 点标记图标
  let icon = `<div style="border-radius: 100%;width: 20px;height: 20px; background-color: red"></div>`
  let markerd = new aMap.Marker({
    map: map,
    content: props.markerIcon,
    offset: new aMap.Pixel(-8, -8),
    visible: true, // 点标记是否可见
    position: [marker.longitude, marker.latitude],
  })

  // 点击标点后，后面读取
  markerd.infoWindow = props.infoWindowRender
  // markerd.infoWindow = `<div>请设置信息弹窗</div>`
  markerd.extData = marker

  // console.log(markerd)
  markerd.on('click', markerClick)
  if (marker.name === '新疆') {
    // 触发上面的点击事件
    markerd.emit('click', {target: markerd})
  }

  return markerd
}*/

let cluster = null
const initMap = () => {
  window._AMapSecurityConfig = {
    securityJsCode: '3547f52bcab88052221105cdd01a8a6c'
  }
  AMapLoader.load({
    key: 'cf8892ac657d09b05d9b6d3369d83935', // 申请好的Web端开发者Key，首次调用 load 时必填 todo 如何保存
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    // plugins: ['AMap.Scale', 'AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    Loca: {
      //是否加载 Loca， 缺省不加载
      version: "2.0", //Loca 版本
    },
  })
      .then((AMap) => {
        aMap = AMap;
        // 上来就显示的中心点  北京 116.397, 39.918
        let lnglat = new AMap.LngLat(110, 23.094593)
        map = new AMap.Map('container', {
          //设置地图容器id
          viewMode: '2D', //是否为3D地图模式
          mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
          zoom: 5, //初始化地图级别
          center: lnglat, //初始化地图中心点位置
        })

        // 解决canvas warning，但不起作用
        // let ctx = map.canvas;
        // ctx.imageSmoothingEnabled = false; // 关闭图片平滑处理，可选
        // ctx.webkitImageSmoothingEnabled = false; // 在某些浏览器上需要加上该行，可选
        // ctx.mozImageSmoothingEnabled = false; // 在某些浏览器上需要加上该行，可选
        // ctx.willReadFrequently = true;

        map.clearMap() // 清除地图覆盖物
        // 地图是否可拖拽和缩放
        map.setStatus({
          dragEnable: true, // 是否可拖拽
          zoomEnable: true, // 是否可缩放
        })

        initWindow()
        // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
        // props.points.forEach(marker => setMarker(marker))

        // 添加插件
        AMap.plugin(["AMap.ToolBar", "AMap.Scale", "AMap.HawkEye", "AMap.Geolocation", "AMap.MapType"], () => {
          //异步同时加载多个插件
          // 添加地图插件
          // map.addControl(new AMap.ToolBar()); // 工具条控件;范围选择控件
          map.addControl(new AMap.Scale()); // 显示当前地图中心的比例尺
          // map.addControl(new AMap.HawkEye()); // 显示缩略图
          map.addControl(new AMap.Geolocation()); // 定位当前位置
          // map.addControl(new AMap.MapType()); // 实现默认图层与卫星图,实时交通图层之间切换

          // 以下是鼠标工具插件
          // const mouseTool = new AMap.MouseTool(map);
          // mouseTool.rule();// 用户手动绘制折线图,测量距离
          // mouseTool.measureArea(); // 测量面积
        });

        console.log(props.points)
        // 点聚合注册
        AMap.plugin(["AMap.MarkerCluster"], () => {
          cluster = new AMap.MarkerCluster(
              map, //地图实例
              props.points, //海量点数据，数据中需包含经纬度信息字段 lnglat
              {
                gridSize: 60, //数据聚合计算时网格的像素大小
                renderClusterMarker: _renderClusterMarker, //上述步骤的自定义聚合点样式
                renderMarker: _renderMarker, //上述步骤的自定义非聚合点样式
              }
          );
          console.log(cluster, map)

          cluster.on('click', (item) => {
            console.log(item)
            let clusterData = item.clusterData;
            if (clusterData.length === 0) {
              return
            } else if (clusterData.length === 1) {
              console.log("fff")
              console.log(item, clusterData)
              return;
            }
            let alllng = 0, alllat = 0
            for (const mo of clusterData) {
              alllng += mo.lnglat.lng;
              alllat += mo.lnglat.lat;
            }
            const lat = alllat / clusterData.length
            const lng = alllng / clusterData.length
            if (map.getZoom() < 4) {
              map.setZoomAndCenter(map.getZoom() + 8, [lng, lat])
            } else if (map.getZoom() < 8) {
              map.setZoomAndCenter(map.getZoom() + 4, [lng, lat])
            } else {
              map.setZoomAndCenter(map.getZoom() + 2, [lng, lat])
            }
          })
        });

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
  width: 100%;
  height: 100%;
}

.clusterMarkerCount {
  min-height: 0.7rem;
  min-width: 0.7rem;
  padding: 0 0.3rem;
  text-align: center;
  border-radius: 10px;
  position: absolute;
  left: 44px;
  top: -6px;
  z-index: 2;
  background-color: rgba(59, 169, 105, 0.66);
}
</style>

