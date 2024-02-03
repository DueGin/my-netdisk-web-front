<template>
  <div>
    <div class="media-tool-ctn">
      <div class="tool-left">
        <n-button @click="router.go(-2)" v-if="isShowBackButton">返回</n-button>
      </div>
      <div class="tool-right">
        <n-button
            :render-icon="()=>renderIcon('ion:cloud-upload-outline')"
            @click="clickUpload"
        >
          上传
        </n-button>
        <n-button
            type="primary"
            @click="clickDelete"
            :render-icon="()=>renderIcon('mi:delete')"
            v-show="isShowCancelButton"
        >
          删除
        </n-button>
        <n-button
            v-show="isShowCancelButton && !isAlwaysSelectAll"
            type="primary"
            @click="selectAll"
            :render-icon="()=>renderIcon('fluent:select-all-on-24-filled')"
        >
          全选
        </n-button>
        <n-button
            v-show="isShowCancelButton && isAlwaysSelectAll"
            type="primary"
            @click="selectAll"
            :render-icon="()=>renderIcon('fluent:select-all-on-24-regular')"
        >
          取消全选
        </n-button>
        <n-button
            v-show="isShowCancelButton"
            type="primary"
            @click="clickCancel"
            :render-icon="()=>renderIcon('mdi:cancel')"
        >
          取消
        </n-button>
        <n-button
            v-show="!isShowCancelButton"
            type="primary"
            @click="clickEdit"
            :render-icon="()=>renderIcon('mingcute:edit-line')"
        >
          选择
        </n-button>
      </div>
    </div>
    <div ref="mediaContainerRef" class="media-container">
      <div
          v-for="(item, index) in mediaList"
          :class="['media-item',{'cur-poi':isShowCancelButton}]"
          @click="isOpenSelect && selectItem(item, index)"
      >
        <n-image
            @contextmenu="showRightMenu"
            v-if="item.mimeType.includes('image')"
            :src="item.url"
            object-fit="contain"
            style="border-radius: 0.5rem"
            :preview-disabled="isPreviewPhoto"
        />
        <VideoPlayer
            v-if="item.mimeType.includes('video')"
            :isUseDialog="isUseVideoDialog"
            :src="item.url"
        />
        <n-icon v-show="item.isSelected" size="2rem" class="select-icon">
          <Icon icon="zondicons:checkmark-outline" color="#758f69"/>
        </n-icon>
      </div>
    </div>
    <div style="display: flex;align-items: center;justify-content: center">
      <n-button :disabled="!hasMore" tertiary style="width: 30%" @click="handleClickMoreButton"
                :loading="moreButtonLoading">
        {{ hasMore ? '加载更多' : '没有更多' }}
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, h, watch, onMounted, nextTick} from 'vue'
import VideoPlayer from "@/components/videoPlayer/VideoPlayer.vue";
import {Icon} from "@iconify/vue";
import {renderIcon} from "@/utils/render/IconRender.ts";
import {deleteMedia} from "@/apis/media/MediaApi.ts";
import {useMainStore} from "@/store/store.ts";
import {dialog} from "@/utils/tip/TipUtil.ts";
import FileUpload from "@/components/fileUpload/FileUpload.vue";
import router from "@/router";

const props = defineProps({
  uploadUrl: {
    type: String,
    default: import.meta.env.VITE_APP_BASE_API + '/upload'
  },
  // 媒体列表
  mediaList: {
    type: Array,
    default: []
  },
  selectMap: {
    type: Map,
    default: new Map(),
  },
  isShowBackButton: {
    type: Boolean,
    default: false
  },
})

const emits = defineEmits<{
  (e: "getPage", cb: (size: number) => any),
  (e: 'handleDelete', ids: any[]),
  (e: 'uploadCb'),
  (e: 'update:modelValue', obj: any)
}>()

const moreButtonLoading = ref(false);
const hasMore = ref(true);
const handleClickMoreButton = async () => {
  moreButtonLoading.value = true;
  let oldListSize = (<Array<any>>props.mediaList).length;
  console.log(props.mediaList)
  await emits('getPage', (size)=>{
    console.log(oldListSize, size)
    if (oldListSize === size) {
      hasMore.value = false;
    }
  });

  console.log(props.mediaList)


  moreButtonLoading.value = false;

}

const isShowUploadButton = ref(true)
const isPreviewPhoto = ref(false)
const isShowCancelButton = ref(false)
const isUseVideoDialog = ref(true)
const isOpenSelect = ref(false)
const isAlwaysSelectAll = ref(false)

// 选中的图片map
const selectMap = props.selectMap ? props.selectMap : new Map();
computed({
  get() {
    return new Proxy(props.selectMap, {
      set(obj, name, val) {
        emits("update:modelValue", {
          ...obj,
          [name]: val
        })
        return true
      }
    })
  },
  set(value) {
    emits("update:modelValue", {
      ...props.selectMap,
      keyword: value
    })
  }
})


// 显示右键菜单
const showRightMenu = (e) => {
  console.log(e)
}

// 全选
const selectAll = () => {
  if (isAlwaysSelectAll.value) {
    console.log('cancel select all')
    props.mediaList?.forEach(t => {
      t.isSelected = false
    })

    selectMap.clear()
    isAlwaysSelectAll.value = false
  } else {
    console.log('select all')
    props.mediaList?.forEach(t => {
      t.isSelected = true
      selectMap.set(t.id, t)
    })

    isAlwaysSelectAll.value = true
  }
}

// 选择图片
const selectItem = (item, idx) => {
  console.log(item)
  if (selectMap.has(item.id)) {
    console.log('had')
    selectMap.delete(item.id)
    item.isSelected = false
  } else {
    console.log('no had')
    selectMap.set(item.id, {...item, index: idx})
    item.isSelected = true
  }
  console.log(item)
}

// 点击删除按钮
const clickDelete = () => {
  let ids = [];
  let indexs: number[] = [];
  selectMap.forEach(t => {
    ids.push(t.id);
    indexs.push(t.index);
  })
  dialog.create({
    icon: '🚮',
    title: '确定删除吗？',
    content: '他们将去往垃圾篓🗑️，帮你保管30天先',
    positiveText: '😑早就想删了',
    onPositiveClick: () => {
      emits('handleDelete', ids);

      // 手动删掉
      indexs.forEach(idx => (<Array<any>>props.mediaList).splice(idx, 1));
      clickCancel();
    },
    negativeText: '🤔容我再想想',
  })

  // deleteMedia(ids).then(res => {
  //   if (res.code === 200) {
  //     console.log('delete success')
  //     // 关闭选择
  //     clickCancel()
  //     // 执行cb
  //
  //   }
  // })
}

// 清空选择的图片
const clearSelectPhoto = () => {
  for (let value of selectMap.values()) {
    value.isSelected = false
  }
  isAlwaysSelectAll.value = false
  selectMap.clear()
}

// 点击取消按钮
const clickCancel = () => {
  // 不显示取消按钮
  isShowCancelButton.value = false
  // 关闭禁用预览图片
  isPreviewPhoto.value = false
  // 打开使用视频dialog
  isUseVideoDialog.value = false
  // 关闭点击事件
  isOpenSelect.value = false
  isShowUploadButton.value = true;
  // 清空选中map
  clearSelectPhoto()
}

// 点击编辑按钮
const clickEdit = () => {
  // 禁用预览图片
  isPreviewPhoto.value = true
  // 显示取消按钮
  isShowCancelButton.value = true
  // 关掉视频dialog
  isUseVideoDialog.value = false
  isShowUploadButton.value = false;
  // 打开点击事件
  isOpenSelect.value = true
}

// 点击上传按钮
const clickUpload = () => {
  dialog.create({
    icon: h(''),
    title: h(''),
    content: () => h(FileUpload, {
      uploadUrl: props.uploadUrl,
      isAnalysisExif: true,
      isMultiple: true
      // ['on-finish']: () => {
      //   emits('uploadCb')
      // }
    }),
    onClose: () => {
      emits('uploadCb')
    }
  })
}

</script>

<style scoped>
.media-tool-ctn {
  display: flex;
  margin-bottom: 1rem;
}

.select-icon {
  position: absolute;
  right: -0.3rem;
  bottom: -0.3rem;
}

.tool-left {
  width: 50%;
  display: flex;
  column-gap: 1rem;
  justify-content: flex-start;
}

.tool-right {
  width: 50%;
  display: flex;
  column-gap: 1rem;
  justify-content: flex-end;
}

.media-container :deep(img) {
  width: 100%;
  height: 100%;
}

.media-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.media-item {
  border-radius: 0.5rem;
  overflow: hidden;
  width: 12rem;
  height: 8rem;
  box-sizing: border-box;
  transition: all 1s;
  display: flex;
  align-items: center;
  position: relative;
}

.media-item:hover {
  border: 1px solid rgba(136, 136, 136, 0.74);
}
</style>
