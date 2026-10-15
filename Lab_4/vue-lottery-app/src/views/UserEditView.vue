<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ServiceProvider } from '@/services/service-provider'

const props = defineProps<{ id: string }>()
const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const isLoading = ref(true)

onMounted(async () => {
  try {
    const data = await ServiceProvider.users.getById(Number(props.id))
    firstName.value = data.firstName
    lastName.value = data.lastName
    email.value = data.email
  } finally {
    isLoading.value = false
  }
})

const handleSave = async () => {
  try {
    await ServiceProvider.users.update(Number(props.id), {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    })
    alert('Данные пользователя обновлены!')
    router.push('/users')
  } catch (e) {
    alert((e as Error).message)
  }
}

const close = () => router.push('/users')
</script>

<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-card">
      <h3>Редактирование пользователя</h3>
      <div v-if="isLoading">Загрузка...</div>
      <form v-else @submit.prevent="handleSave">
        <div class="field">
          <label>Имя</label>
          <input v-model="firstName" type="text" />
        </div>
        <div class="field">
          <label>Фамилия</label>
          <input v-model="lastName" type="text" />
        </div>
        <div class="field">
          <label>Email</label>
          <input v-model="email" type="email" />
        </div>
        <div class="actions">
          <button type="button" @click="close">Отмена</button>
          <button type="submit" class="btn-save">Сохранить</button>
        </div>
      </form>
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
  width: 380px;
}
.field {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  input {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}
.btn-save {
  background: #00a0dc;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
}
</style>
