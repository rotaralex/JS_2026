<script setup lang="ts">
import InputText from 'primevue/inputtext'

defineProps<{
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: string
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="app-input">
    <label v-if="label" class="app-input__label">{{ label }}</label>
    <InputText
      :value="modelValue"
      :type="type || 'text'"
      :placeholder="placeholder"
      :invalid="!!error"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <small v-if="error" class="app-input__error">{{ error }}</small>
  </div>
</template>

<style scoped lang="scss">
.app-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;

  &__label {
    font-weight: 500;
    font-size: 14px;
  }

  &__error {
    color: #e24c4c;
    font-size: 12px;
  }
}
</style>
