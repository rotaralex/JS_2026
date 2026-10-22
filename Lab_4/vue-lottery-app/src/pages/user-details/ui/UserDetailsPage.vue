<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ServiceProvider } from '@/shared/api'
import type { UserService, User } from '@/entities/user'

const props = defineProps<{ id: string }>()
const router = useRouter()

const user = ref<User | null>(null)
const isLoading = ref(true)

const userService = ServiceProvider.get<UserService>('users')

onMounted(async () => {
  try {
    user.value = await userService.getById(Number(props.id))
  } catch (e) {
    alert((e as Error).message)
  } finally {
    isLoading.value = false
  }
})

const close = () => router.push('/users')
</script>

<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-card">
      <div v-if="isLoading">Завантаження...</div>
      <div v-else-if="user">
        <h2>Деталі користувача</h2>
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Ім'я:</strong> {{ user.firstName }} {{ user.lastName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <button @click="close">Закрити</button>
      </div>
    </div>
  </div>
</template>
