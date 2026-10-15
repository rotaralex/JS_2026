<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Participant, FormErrors } from '../types/lottery'
import AppInput from './ui/AppInput.vue'
import AppButton from './ui/AppButton.vue'

const props = defineProps<{
  existingEmails: string[]
}>()

const emit = defineEmits<{
  (e: 'add-participant', participant: Omit<Participant, 'id'>): void
}>()

const form = reactive({
  name: '',
  dob: '',
  email: '',
  phone: '',
})

const errors = reactive<FormErrors>({})
const isSubmitted = ref(false)

// Максимально допустима дата народження — сьогодні
const todayStr = new Date().toISOString().split('T')[0]

// Валідація окремих полів
const validate = (): boolean => {
  errors.name = ''
  errors.dob = ''
  errors.email = ''
  errors.phone = ''

  let isValid = true

  // Name
  if (!form.name.trim()) {
    errors.name = 'This value is required.'
    isValid = false
  }

  // Date of Birth
  if (!form.dob) {
    errors.dob = 'This value is required.'
    isValid = false
  } else if (new Date(form.dob) > new Date()) {
    errors.dob = 'Date of birth cannot be in the future.'
    isValid = false
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'This value is required.'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
    isValid = false
  } else if (props.existingEmails.includes(form.email.trim().toLowerCase())) {
    errors.email = 'Participant with this email already exists.'
    isValid = false
  }

  // Phone (+380XXXXXXXXX)
  const phoneRegex = /^\+380\d{9}$/
  if (!form.phone.trim()) {
    errors.phone = 'This value is required.'
    isValid = false
  } else if (!phoneRegex.test(form.phone.trim())) {
    errors.phone = 'Phone must match format +380XXXXXXXXX.'
    isValid = false
  }

  return isValid
}

const isFieldValid = (field: keyof typeof form) => {
  return isSubmitted.value && !errors[field] && !!form[field]
}

const handleSubmit = () => {
  isSubmitted.value = true
  if (validate()) {
    emit('add-participant', {
      name: form.name.trim(),
      dob: form.dob,
      email: form.email.trim(),
      phone: form.phone.trim(),
    })
    // Очищення форми без тригеру валідації помилок
    form.name = ''
    form.dob = ''
    form.email = ''
    form.phone = ''
    isSubmitted.value = false
    Object.keys(errors).forEach((key) => {
      errors[key as keyof FormErrors] = ''
    })
  }
}
</script>

<template>
  <section class="register-card" @keydown.enter="handleSubmit">
    <div class="card-header">
      <h3 class="card-title">REGISTER FORM</h3>
      <p class="card-subtitle">Please fill in all the fields.</p>
    </div>

    <form @submit.prevent="handleSubmit">
      <AppInput
        v-model="form.name"
        label="Name"
        placeholder="Enter user name"
        :error="errors.name"
        :is-valid="isFieldValid('name')"
      />

      <AppInput
        v-model="form.dob"
        label="Date of Birth"
        type="date"
        :max="todayStr"
        :error="errors.dob"
        :is-valid="isFieldValid('dob')"
      />

      <AppInput
        v-model="form.email"
        label="Email"
        placeholder="Enter email"
        :error="errors.email"
        :is-valid="isFieldValid('email')"
      />

      <AppInput
        v-model="form.phone"
        label="Phone number"
        placeholder="+380XXXXXXXXX"
        :error="errors.phone"
        :is-valid="isFieldValid('phone')"
      />

      <div class="form-actions">
        <AppButton type="submit">Save</AppButton>
      </div>
    </form>
  </section>
</template>

<style scoped lang="scss">
.register-card {
  background: #ffffff;
  border: 1px solid #eceff1;
  border-radius: 4px;
  padding: 24px 28px;
}

.card-title {
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 700;
  color: #2d3748;
}

.card-subtitle {
  margin: 0 0 20px 0;
  font-size: 13px;
  color: #a0aec0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
