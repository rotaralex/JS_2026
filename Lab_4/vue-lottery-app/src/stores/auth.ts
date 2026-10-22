import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ServiceProvider } from '@/services/service-provider'
import type { User } from '@/entities/user/model/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('authUser') || 'null'))
  const token = ref<string | null>(localStorage.getItem('accessToken'))

  const isAuthenticated = computed(() => !!token.value)

  async function login(username: string, password: string) {
    const res = await ServiceProvider.auth.login(username, password)
    token.value = res.accessToken
    user.value = res

    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('refreshToken', res.refreshToken)
    localStorage.setItem('authUser', JSON.stringify(res))
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('authUser')
  }

  return { user, token, isAuthenticated, login, logout }
})
