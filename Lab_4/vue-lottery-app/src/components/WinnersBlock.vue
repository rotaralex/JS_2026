<script setup lang="ts">
import type { Participant } from '../types/lottery'
import WinnerItem from './WinnerItem.vue'
import AppButton from './ui/AppButton.vue'

defineProps<{
  winners: Participant[]
  canPickWinner: boolean
}>()

defineEmits<{
  (e: 'pick-winner'): void
  (e: 'remove-winner', id: string): void
}>()
</script>

<template>
  <div class="card winners-box">
    <div class="winners-container">
      <div v-if="winners.length > 0" class="badges-list">
        <WinnerItem
          v-for="w in winners"
          :key="w.id"
          :winner="w"
          @remove="$emit('remove-winner', $event)"
        />
      </div>
      <span class="winners-placeholder">Winners</span>
    </div>
    <AppButton :disabled="!canPickWinner" @click="$emit('pick-winner')"> New winner </AppButton>
  </div>
</template>

<style scoped lang="scss">
.winners-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 20px;
  background: #ffffff;
  border: 1px solid #eceff1;
  border-radius: 4px;
}

.winners-container {
  display: flex;
  align-items: center;
  flex: 1;
  min-height: 40px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 6px 12px;
  gap: 10px;
  background: #ffffff;
}

.badges-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.winners-placeholder {
  color: #a0aec0;
  font-size: 13.5px;
}
</style>
