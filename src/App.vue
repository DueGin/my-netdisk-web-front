<script setup lang="ts">
</script>

<template>
  <!-- 通知最多5条 -->
  <n-notification-provider :max="5">
    <n-dialog-provider>
      <n-message-provider>

        <router-view v-slot="{Component}">
          <keep-alive>
            <Component :is="Component"/>
          </keep-alive>
        </router-view>

      </n-message-provider>
    </n-dialog-provider>
  </n-notification-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
