import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ServiceProvider } from '@/shared/api'
import type { UserService } from '../api/user.service'
import type { User } from '../model/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const total = ref(0)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const hasUsers = computed(() => users.value.length > 0)
  const service = () => ServiceProvider.get<UserService>('users')

  async function fetchUsers(limit = 10, skip = 0) {
    isLoading.value = true
    error.value = null
    try {
      const data = await service().getAll({ limit, skip })
      users.value = data.items
      total.value = data.total
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      isLoading.value = false
    }
  }

  async function searchUsers(query: string) {
    isLoading.value = true
    error.value = null
    try {
      const data = await service().search(query)
      users.value = data.items
      total.value = data.total
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      isLoading.value = false
    }
  }

  async function removeUser(id: number) {
    await service().delete(id)
    users.value = users.value.filter((u: User) => u.id !== id)
  }

  return { users, total, isLoading, error, hasUsers, fetchUsers, searchUsers, removeUser }
})
