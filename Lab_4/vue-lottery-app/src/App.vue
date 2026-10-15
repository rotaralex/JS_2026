<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div id="app-layout">
    <AppHeader />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  background-color: #f8fafc;
}
.main-content {
  padding: 20px;
}
</style>
