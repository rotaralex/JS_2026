<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/entities/user'
import { AppButton, AppInput, AppTable } from '@/shared/ui'

const usersStore = useUsersStore()
const { users, isLoading } = storeToRefs(usersStore)
const searchQuery = ref('')

const columns = [
  { field: 'id', header: 'ID' },
  { field: 'firstName', header: "Ім'я" },
  { field: 'lastName', header: 'Прізвище' },
  { field: 'email', header: 'Email' }
]

onMounted(() => {
  usersStore.fetchUsers()
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    usersStore.searchUsers(searchQuery.value)
  } else {
    usersStore.fetchUsers()
  }
}

const handleRemove = (id: number) => {
  if (confirm('Ви дійсно бажаєте видалити користувача?')) {
    usersStore.removeUser(id)
  }
}
</script>

<template>
  <div class="users-page">
    <h2>Список користувачів</h2>

    <div class="search-bar">
      <AppInput v-model="searchQuery" placeholder="Пошук по імені..." />
      <AppButton label="Знайти" @click="handleSearch" />
    </div>

    <AppTable :value="users" :columns="columns" :loading="isLoading">
      <template #actions="{ data }">
        <AppButton label="Видалити" severity="danger" @click="handleRemove(data.id)" />
      </template>
    </AppTable>
  </div>
</template>

<style scoped lang="scss">
.users-page {
  max-width: 1000px;
  margin: 0 auto;

  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
}
</style>
