<template>
  <div class="app-container">
    <div>
      <h2>精选推荐</h2>
      <gin-piece>
        哈哈哈
      </gin-piece>
    </div>

    <div>
      <h2>那年今天</h2>
      <gin-piece>
        嘿嘿嘿
      </gin-piece>
    </div>

  </div>
</template>

<script setup lang="ts">

import {onActivated} from "vue";
import GinPiece from "@/components/gin-piece/GinPiece.vue";

onActivated(() => {
  console.log('activated home')
})

</script>

<style scoped>
.piece {
  border-radius: 10px;
  border: 1px solid gray;
}
</style>
