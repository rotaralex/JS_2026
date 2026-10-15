<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  (e: 'filter-by-name', query: string): void
}>()

const searchQuery = ref('')
let timeoutId: ReturnType<typeof setTimeout> | null = null

watch(searchQuery, (newVal) => {
  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    emit('filter-by-name', newVal.trim())
  }, 300)
})
</script>

<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Пошук учасника за іменем..."
      class="search-input"
    />
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  margin-bottom: 14px;
}
.search-input {
  width: 100%;
  padding: 9px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 13.5px;
  outline: none;

  &:focus {
    border-color: #00a0dc;
  }
}
</style>
