<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ServiceProvider } from '@/shared/api'
import type { UserService } from '@/entities/user'

const props = defineProps<{ id: string }>()
const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const isLoading = ref(true)

const userService = ServiceProvider.get<UserService>('users')

onMounted(async () => {
  try {
    const data = await userService.getById(Number(props.id))
    firstName.value = data.firstName
    lastName.value = data.lastName
    email.value = data.email
  } finally {
    isLoading.value = false
  }
})

const handleSave = async () => {
  await userService.update(Number(props.id), {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value
  })
  router.push('/users')
}
</script>

<template>
  <div class="edit-page">
    <h2>Редагувати користувача</h2>
    <div v-if="isLoading">Завантаження...</div>
    <form v-else @submit.prevent="handleSave">
      <div>
        <label>Ім'я:</label>
        <input v-model="firstName" type="text" required />
      </div>
      <div>
        <label>Прізвище:</label>
        <input v-model="lastName" type="text" required />
      </div>
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>
      <button type="submit">Зберегти</button>
    </form>
  </div>
</template>
