<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'danger' | 'secondary'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    disabled: false,
    type: 'button',
  },
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['app-btn', `app-btn--${variant}`]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &--primary {
    background-color: #00a0dc;
    color: #ffffff;
    &:hover:not(:disabled) {
      background-color: #008ec4;
    }
  }

  &--danger {
    background-color: #e53e3e;
    color: #ffffff;
    &:hover:not(:disabled) {
      background-color: #c53030;
    }
  }

  &--secondary {
    background-color: #edf2f7;
    color: #4a5568;
    &:hover:not(:disabled) {
      background-color: #e2e8f0;
    }
  }
}
</style>
