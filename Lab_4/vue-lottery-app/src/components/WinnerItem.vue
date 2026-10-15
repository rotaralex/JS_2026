<script setup lang="ts">
import type { Participant } from '../types/lottery'

defineProps<{
  winner: Participant
}>()

defineEmits<{
  (e: 'remove', id: string): void
}>()
</script>

<template>
  <div class="winner-badge">
    <span class="winner-name">{{ winner.name }}</span>
    <button
      type="button"
      class="btn-remove"
      title="Видалити переможця"
      @click="$emit('remove', winner.id)"
    >
      &times;
    </button>
  </div>
</template>

<style scoped lang="scss">
.winner-badge {
  display: inline-flex;
  align-items: center;
  background-color: #00a0dc;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 12.5px;
  font-weight: 500;
  gap: 8px;
}

.btn-remove {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0;
  font-size: 15px;
  line-height: 1;

  &:hover {
    opacity: 0.8;
  }
}
</style>
