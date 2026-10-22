<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session'
import { AppButton, AppInput } from '@/shared/ui'

const router = useRouter()
const sessionStore = useSessionStore()

const username = ref('emilys')
const password = ref('emilyspass')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await sessionStore.login(username.value, password.value)
    router.push('/users')
  } catch (err) {
    errorMessage.value = (err as Error).message || 'Помилка авторизації'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Авторизація</h2>
      <p class="test-data">Тестові дані: <b>emilys</b> / <b>emilyspass</b></p>

      <form @submit.prevent="handleLogin">
        <AppInput
          v-model="username"
          label="Username"
          placeholder="Введіть логін"
        />
        <AppInput
          v-model="password"
          type="password"
          label="Password"
          placeholder="Введіть пароль"
        />

        <div v-if="errorMessage" class="error-banner">
          {{ errorMessage }}
        </div>

        <AppButton
          type="submit"
          label="Увійти"
          :loading="isLoading"
          style="width: 100%; margin-top: 10px;"
        />
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-card {
  background: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.test-data {
  background: #f1f5f9;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  margin-bottom: 20px;
}

.error-banner {
  background-color: #ffebe9;
  color: #d9381e;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 12px;
  font-size: 14px;
}
</style>
