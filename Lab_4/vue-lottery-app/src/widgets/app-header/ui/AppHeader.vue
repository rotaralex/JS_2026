<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSessionStore } from '@/entities/session'
import { AppButton } from '@/shared/ui'

const router = useRouter()
const sessionStore = useSessionStore()
const { isAuthenticated } = storeToRefs(sessionStore)

const handleLogout = () => {
  sessionStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="app-header">
    <div class="logo">🎰 LotteryApp</div>
    <nav class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About author</router-link>
      <router-link v-if="isAuthenticated" to="/users">Users</router-link>

      <AppButton
        v-if="isAuthenticated"
        label="Logout"
        severity="danger"
        @click="handleLogout"
      />
      <router-link v-else to="/login">
        <AppButton label="Login" severity="info" />
      </router-link>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .logo {
    font-weight: bold;
    font-size: 20px;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 20px;

    a {
      text-decoration: none;
      color: #334155;
      font-weight: 500;

      &.router-link-active {
        color: #0284c7;
      }
    }
  }
}
</style>
