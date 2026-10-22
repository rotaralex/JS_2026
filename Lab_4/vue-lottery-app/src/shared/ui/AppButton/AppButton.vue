<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  label?: string
  loading?: boolean
  severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger'
  type?: 'button' | 'submit' | 'reset'
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <Button
    :label="label"
    :loading="loading"
    :severity="severity"
    :type="type || 'button'"
    @click="$emit('click', $event)"
  />
</template>
