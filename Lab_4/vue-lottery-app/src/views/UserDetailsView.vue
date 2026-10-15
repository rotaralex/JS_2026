<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ServiceProvider } from '@/services/service-provider'
import type { User } from '@/types/user'

const props = defineProps<{ id: string }>()
const router = useRouter()

const user = ref<User | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    user.value = await ServiceProvider.users.getById(Number(props.id))
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
      <div v-if="isLoading">Загрузка профиля...</div>
      <div v-else-if="user">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Возраст:</strong> {{ user.age }}</p>
        <p><strong>Пол:</strong> {{ user.gender }}</p>
        <p><strong>Телефон:</strong> {{ user.phone }}</p>
      </div>
      <button class="btn-close" @click="close">Закрыть</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 350px;
}
.btn-close {
  margin-top: 16px;
  width: 100%;
  padding: 8px;
  background: #64748b;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
