<script setup lang="ts">
import { AppHeader } from '@/widgets/app-header'
</script>

<template>
  <AppHeader />
  <div class="main-content">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f8fafc;
}

.main-content {
  padding: 20px;
}
</style>
