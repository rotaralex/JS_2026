<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
    type?: string
    error?: string
    isValid?: boolean
    max?: string
  }>(),
  {
    type: 'text',
    placeholder: '',
    error: '',
    isValid: false,
  },
)

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()
</script>

<template>
  <div class="input-field">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div class="input-wrapper">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :max="max"
        :class="['input-control', { 'is-error': !!error, 'is-valid': isValid && !error }]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
      />
      <span v-if="isValid && !error" class="valid-icon">✔</span>
    </div>
    <span v-if="error" class="error-text">{{ error }}</span>
  </div>
</template>

<style scoped lang="scss">
.input-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  position: relative;
}

.input-label {
  font-size: 13.5px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 6px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-control {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: #fcfcfc;
  color: #2d3748;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    border-color: #00a0dc;
  }

  &.is-valid {
    border-color: #10b981;
    background-color: #ffffff;
    padding-right: 32px;
  }

  &.is-error {
    border-color: #f87171;
    background-color: #ffffff;
  }
}

.valid-icon {
  position: absolute;
  right: 12px;
  color: #047857;
  font-size: 13px;
  pointer-events: none;
}

.error-text {
  font-size: 12px;
  color: #ef4444;
  margin-top: 4px;
}
</style>
