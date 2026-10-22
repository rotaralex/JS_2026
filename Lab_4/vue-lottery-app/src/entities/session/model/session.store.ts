import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ServiceProvider } from '@/shared/api'
import type { AuthService } from '../api/auth.service'
import type { User } from '@/shared/model'
export const useSessionStore = defineStore(
  'session',
  () => {
    const user = ref<User | null>(null)
    const accessToken = ref<string | null>(null)

    const isAuthenticated = computed(() => accessToken.value !== null)
    const authService = () => ServiceProvider.get<AuthService>('auth')

    async function login(username: string, pass: string) {
      const res = await authService().login(username, pass)
      accessToken.value = res.accessToken
      user.value = res
    }

    function logout() {
      accessToken.value = null
      user.value = null
    }

    return { user, accessToken, isAuthenticated, login, logout }
  },
  {
    persist: true,
  }
)
