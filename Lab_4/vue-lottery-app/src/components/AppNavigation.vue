<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <nav class="app-nav">
    <RouterLink to="/" class="nav-link">Home</RouterLink>
    <RouterLink to="/about" class="nav-link">About author</RouterLink>
    <RouterLink v-if="auth.isAuthenticated" to="/users" class="nav-link">Users</RouterLink>
    <RouterLink v-if="!auth.isAuthenticated" to="/login" class="nav-link">Login</RouterLink>
    <button v-else class="btn-logout" @click="auth.logout()">Logout</button>
  </nav>
</template>

<style scoped lang="scss">
.app-nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-link {
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 0.2s;

  &.router-link-active {
    color: #00a0dc;
    background-color: #e6f6fc;
  }
}

.btn-logout {
  background: #f87171;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
