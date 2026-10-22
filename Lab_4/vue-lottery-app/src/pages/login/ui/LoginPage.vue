<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const errorMessage = ref('')
const isLoading = ref(false)

const schema = yup.object({
  username: yup.string().required('Имя пользователя обязательно'),
  password: yup
    .string()
    .min(6, 'Пароль должен быть минимум 6 символов')
    .required('Пароль обязателен'),
})

const { handleSubmit } = useForm({ validationSchema: schema })
const { value: username, errorMessage: usernameErr } = useField<string>('username')
const { value: password, errorMessage: passwordErr } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await authStore.login(values.username, values.password)
    const redirectPath = (route.query.redirect as string) || '/users'
    router.push(redirectPath)
  } catch (e) {
    errorMessage.value = (e as Error).message || 'Неверное имя пользователя или пароль'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="login-card">
    <h2>Авторизация</h2>
    <p class="test-credentials">
      Тестовые данные: <strong>emilys</strong> / <strong>emilyspass</strong>
    </p>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Username</label>
        <input v-model="username" type="text" class="input" placeholder="Введите username" />
        <span v-if="usernameErr" class="error-msg">{{ usernameErr }}</span>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" class="input" placeholder="Введите пароль" />
        <span v-if="passwordErr" class="error-msg">{{ passwordErr }}</span>
      </div>

      <div v-if="errorMessage" class="alert-error">
        {{ errorMessage }}
      </div>

      <button type="submit" :disabled="isLoading" class="btn-submit">
        {{ isLoading ? 'Вход...' : 'Войти' }}
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login-card {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.test-credentials {
  font-size: 13px;
  color: #718096;
  background: #edf2f7;
  padding: 8px;
  border-radius: 4px;
}
.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}
.input {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
}
.error-msg {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
}
.alert-error {
  color: #b91c1c;
  background: #fef2f2;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 13px;
}
.btn-submit {
  width: 100%;
  padding: 10px;
  background: #00a0dc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
