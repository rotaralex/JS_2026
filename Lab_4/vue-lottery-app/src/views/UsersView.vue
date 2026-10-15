<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter, RouterView, RouterLink } from 'vue-router'
import { ServiceProvider } from '@/services/service-provider'
import type { User } from '@/types/user'

const route = useRoute()
const router = useRouter()

const users = ref<User[]>([])
const total = ref(0)
const isLoading = ref(false)
const error = ref<string | null>(null)

const limit = 10
const page = ref(Number(route.query.page) || 1)
const searchQuery = ref((route.query.q as string) || '')

const fetchUsers = async () => {
  isLoading.value = true
  error.value = null
  try {
    const skip = (page.value - 1) * limit
    if (searchQuery.value.trim()) {
      const res = await ServiceProvider.users.search(searchQuery.value)
      users.value = res.items
      total.value = res.total
    } else {
      const res = await ServiceProvider.users.getAll({ limit, skip })
      users.value = res.items
      total.value = res.total
    }
  } catch (e) {
    error.value = (e as Error).message
  } finally {
    isLoading.value = false
  }
}

const updateQueryParams = () => {
  router.push({
    query: {
      page: page.value > 1 ? page.value : undefined,
      q: searchQuery.value || undefined,
    },
  })
}

const handleSearch = () => {
  page.value = 1
  updateQueryParams()
}

const changePage = (newPage: number) => {
  page.value = newPage
  updateQueryParams()
}

const handleDelete = async (id: number) => {
  if (!confirm('Удалить пользователя?')) return
  try {
    await ServiceProvider.users.delete(id)
    // Имитация удалена на DummyJSON — обновляем локальный склад
    users.value = users.value.filter((u) => u.id !== id)
  } catch (e) {
    alert((e as Error).message)
  }
}

watch(
  () => route.query,
  () => {
    page.value = Number(route.query.page) || 1
    searchQuery.value = (route.query.q as string) || ''
    fetchUsers()
  },
)

onMounted(fetchUsers)
</script>

<template>
  <div class="users-page">
    <h2>Список пользователей</h2>

    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск по имени..."
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch">Найти</button>
    </div>

    <div v-if="isLoading" class="state-msg">Загрузка данных...</div>
    <div v-else-if="error" class="state-msg error">{{ error }}</div>

    <div v-else class="table-wrap">
      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Возраст</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>{{ u.id }}</td>
            <td>{{ u.firstName }} {{ u.lastName }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.age }}</td>
            <td class="actions">
              <RouterLink :to="`/users/${u.id}`" class="btn-link">Детали</RouterLink>
              <RouterLink :to="`/users/${u.id}/edit`" class="btn-link edit"
                >Редактировать</RouterLink
              >
              <button class="btn-delete" @click="handleDelete(u.id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button :disabled="page <= 1" @click="changePage(page - 1)">Назад</button>
        <span>Страница {{ page }} из {{ Math.ceil(total / limit) || 1 }}</span>
        <button :disabled="page * limit >= total" @click="changePage(page + 1)">Вперед</button>
      </div>
    </div>

    <!-- Вложенные маршруты (/users/:id и /users/:id/edit) -->
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.users-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  input {
    flex: 1;
    padding: 8px;
  }
  button {
    padding: 8px 16px;
    background: #00a0dc;
    color: white;
    border: none;
    border-radius: 4px;
  }
}
.users-table {
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #e2e8f0;
    padding: 10px;
    text-align: left;
  }
}
.actions {
  display: flex;
  gap: 8px;
}
.btn-link {
  color: #00a0dc;
  text-decoration: none;
  font-size: 13px;
}
.btn-delete {
  background: #ef4444;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
.state-msg {
  text-align: center;
  padding: 20px;
  &.error {
    color: red;
  }
}
</style>
