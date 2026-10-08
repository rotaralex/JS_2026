<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User } from '../types/user'
import initialUsers from '../data/users.json'

// Стан юзерів та фільтрів
const users = ref<User[]>(initialUsers as User[])
const selectedGender = ref<'all' | 'male' | 'female'>('all')
const onlyAdults = ref<boolean>(false)
const sortKey = ref<'name' | 'age' | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')

// Збереження стану розгортання details для кожного юзера
const expandedUsers = ref<Record<number, boolean>>({})

const toggleDetails = (userId: number) => {
  expandedUsers.value[userId] = !expandedUsers.value[userId]
}

// Метод обчислення вікового класу (об'єктний синтаксис :class)
const getAgeClass = (age: number) => {
  return {
    minor: age < 18,
    young: age >= 18 && age <= 30,
    adult: age >= 31 && age <= 50,
    senior: age > 50,
  }
}

// Форматування дати народження DD.MM.YYYY
const formatDate = (isoString: string) => {
  const d = new Date(isoString)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

// Керування сортуванням
const setSorting = (key: 'name' | 'age', direction: 'asc' | 'desc') => {
  sortKey.value = key
  sortDirection.value = direction
}

// Скидання всіх фільтрів та сортування
const resetFilters = () => {
  selectedGender.value = 'all'
  onlyAdults.value = false
  sortKey.value = null
  sortDirection.value = 'asc'
}

// Фільтрація та сортування
const processedUsers = computed(() => {
  let list = [...users.value]

  // Фільтр за статтю
  if (selectedGender.value !== 'all') {
    list = list.filter((u) => u.gender === selectedGender.value)
  }

  // Фільтр 18+
  if (onlyAdults.value) {
    list = list.filter((u) => u.dob.age >= 18)
  }

  // Сортування (не ламає фільтрацію)
  if (sortKey.value) {
    list.sort((a, b) => {
      let valA: string | number
      let valB: string | number

      if (sortKey.value === 'name') {
        valA = `${a.name.first} ${a.name.last}`.toLowerCase()
        valB = `${b.name.first} ${b.name.last}`.toLowerCase()
      } else {
        valA = a.dob.age
        valB = b.dob.age
      }

      if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1
      if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return list
})
</script>

<template>
  <div class="users-container">
    <!-- Toolbar -->
    <header class="toolbar">
      <div class="toolbar-group">
        <span class="group-title">Стать:</span>
        <button :class="{ active: selectedGender === 'all' }" @click="selectedGender = 'all'">
          Всі
        </button>
        <button :class="{ active: selectedGender === 'male' }" @click="selectedGender = 'male'">
          Чоловіки
        </button>
        <button :class="{ active: selectedGender === 'female' }" @click="selectedGender = 'female'">
          Жінки
        </button>
      </div>

      <div class="toolbar-group">
        <span class="group-title">Вік:</span>
        <button :class="{ active: !onlyAdults }" @click="onlyAdults = false">Всі</button>
        <button :class="{ active: onlyAdults }" @click="onlyAdults = true">18+</button>
      </div>

      <div class="toolbar-group">
        <span class="group-title">Сортування:</span>
        <button
          :class="{ active: sortKey === 'name' && sortDirection === 'asc' }"
          @click="setSorting('name', 'asc')"
        >
          Ім'я &uarr;
        </button>
        <button
          :class="{ active: sortKey === 'name' && sortDirection === 'desc' }"
          @click="setSorting('name', 'desc')"
        >
          Ім'я &darr;
        </button>
        <button
          :class="{ active: sortKey === 'age' && sortDirection === 'asc' }"
          @click="setSorting('age', 'asc')"
        >
          Вік &uarr;
        </button>
        <button
          :class="{ active: sortKey === 'age' && sortDirection === 'desc' }"
          @click="setSorting('age', 'desc')"
        >
          Вік &darr;
        </button>
      </div>

      <button class="btn-reset" @click="resetFilters">Очистити все</button>
    </header>

    <!-- Повідомлення, якщо список порожній -->
    <div v-if="processedUsers.length === 0" class="empty-message">Список юзерів пустий</div>

    <!-- Список карток користувачів -->
    <div v-else class="cards-grid">
      <article
        v-for="user in processedUsers"
        :key="user.id"
        class="user-card"
        :class="getAgeClass(user.dob.age)"
      >
        <!-- Ліва колонка картки -->
        <aside class="left-pane">
          <div class="avatar-wrap">
            <img :src="user.picture" :alt="`${user.name.first} ${user.name.last}`" class="avatar" />
          </div>
          <h2 class="user-fullname">
            {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}
          </h2>
          <div class="meta-row">
            <span class="meta-item">{{ user.gender }}</span>
            <span class="meta-divider" v-if="user.dob.age > 18">|</span>
            <!-- v-if: вік виводиться, тільки якщо більше 18 -->
            <span class="meta-item" v-if="user.dob.age > 18"> {{ user.dob.age }} years </span>
          </div>

          <div class="contact-brief">
            <div class="brief-item">
              <span class="icon">📍</span>
              <span
                >{{ user.location.city }}, {{ user.location.state }},
                {{ user.location.country }}</span
              >
            </div>
            <div class="brief-item">
              <span class="icon">✉️</span>
              <a :href="`mailto:${user.email}`">{{ user.email }}</a>
            </div>
            <div class="brief-item">
              <span class="icon">📞</span>
              <span>{{ user.phone }}</span>
            </div>
            <div class="brief-item">
              <span class="icon">📱</span>
              <span>{{ user.cell }}</span>
            </div>
          </div>
        </aside>

        <!-- Права колонка картки -->
        <main class="right-pane">
          <!-- Accordion / Details блок з v-show -->
          <section class="section-card details-card">
            <header class="section-header clickable" @click="toggleDetails(user.id)">
              <div class="header-title">
                <span class="icon">👤</span>
                <h3>About me</h3>
              </div>
              <span class="chevron" :class="{ open: expandedUsers[user.id] }">▼</span>
            </header>
            <div v-show="expandedUsers[user.id]" class="details-content">
              <p>{{ user.details }}</p>
            </div>
          </section>

          <!-- Personal Information -->
          <section class="section-card">
            <header class="section-header">
              <div class="header-title">
                <span class="icon">📄</span>
                <h3>Personal Information</h3>
              </div>
            </header>
            <dl class="info-list">
              <div class="info-row">
                <dt>Full name</dt>
                <dd>{{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</dd>
              </div>
              <div class="info-row">
                <dt>Gender</dt>
                <dd class="capitalize">{{ user.gender }}</dd>
              </div>
              <div class="info-row">
                <dt>Date of birth</dt>
                <dd>
                  {{ formatDate(user.dob.date) }}
                  <span v-if="user.dob.age > 18"> (age {{ user.dob.age }})</span>
                </dd>
              </div>
              <div class="info-row">
                <dt>Email</dt>
                <dd>{{ user.email }}</dd>
              </div>
              <div class="info-row">
                <dt>Phone</dt>
                <dd>{{ user.phone }}</dd>
              </div>
              <div class="info-row">
                <dt>Cell</dt>
                <dd>{{ user.cell }}</dd>
              </div>
            </dl>
          </section>

          <!-- Location -->
          <section class="section-card">
            <header class="section-header">
              <div class="header-title">
                <span class="icon">📍</span>
                <h3>Location</h3>
              </div>
            </header>
            <dl class="info-list">
              <div class="info-row">
                <dt>Street</dt>
                <dd>{{ user.location.street.number }} {{ user.location.street.name }}</dd>
              </div>
              <div class="info-row">
                <dt>City</dt>
                <dd>{{ user.location.city }}</dd>
              </div>
              <div class="info-row">
                <dt>State</dt>
                <dd>{{ user.location.state }}</dd>
              </div>
              <div class="info-row">
                <dt>Country</dt>
                <dd>{{ user.location.country }}</dd>
              </div>
              <div class="info-row">
                <dt>Postcode</dt>
                <dd>{{ user.location.postcode }}</dd>
              </div>
              <div class="info-row">
                <dt>Timezone</dt>
                <dd>
                  {{ user.location.timezone.offset }} ({{ user.location.timezone.description }})
                </dd>
              </div>
            </dl>
          </section>

          <!-- Hobbies (v-for) -->
          <section class="section-card">
            <header class="section-header">
              <div class="header-title">
                <span class="icon">⭐</span>
                <h3>Hobbies</h3>
              </div>
            </header>
            <div class="hobbies-list">
              <span v-for="(hobby, idx) in user.hobbies" :key="idx" class="hobby-pill">
                {{ hobby }}
              </span>
            </div>
          </section>
        </main>
      </article>
    </div>
  </div>
</template>

<style scoped>
.users-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1e293b;
}

/* Toolbar */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  background-color: #ffffff;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.group-title {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  margin-right: 4px;
}

button {
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
  color: #334155;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  background-color: #e2e8f0;
}

button.active {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.btn-reset {
  margin-left: auto;
  background-color: #ef4444;
  border-color: #ef4444;
  color: white;
}

.btn-reset:hover {
  background-color: #dc2626;
}

.empty-message {
  text-align: center;
  padding: 48px 0;
  font-size: 18px;
  font-weight: 500;
  color: #64748b;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
}

.cards-grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* User Card Styles */
.user-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 16px;
  border: 2px solid transparent;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: border-color 0.2s ease;
}

@media (min-width: 860px) {
  .user-card {
    flex-direction: row;
  }
}

/* Вікові класи оформлення картки */
.user-card.minor {
  border-color: #38bdf8; /* Блакитний до 18 */
}
.user-card.young {
  border-color: #34d399; /* Зелений 18-30 */
}
.user-card.adult {
  border-color: #fbbf24; /* Помаранчево-жовтий 31-50 */
}
.user-card.senior {
  border-color: #a855f7; /* Фіолетовий 50+ */
}

/* Left Pane */
.left-pane {
  flex: 0 0 340px;
  padding: 32px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (min-width: 860px) {
  .left-pane {
    border-bottom: none;
    border-right: 1px solid #f1f5f9;
  }
}

.avatar-wrap {
  width: 100%;
  height: 260px;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #f1f5f9;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-fullname {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 24px;
}

.meta-divider {
  color: #cbd5e1;
}

.contact-brief {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  font-size: 13px;
  color: #475569;
}

.brief-item {
  display: flex;
  align-items: center;
  gap: 10px;
  word-break: break-all;
}

.brief-item a {
  color: #2563eb;
  text-decoration: none;
}

.brief-item a:hover {
  text-decoration: underline;
}

/* Right Pane */
.right-pane {
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fafbfd;
}

.section-card {
  background-color: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 16px 20px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-header.clickable {
  cursor: pointer;
  user-select: none;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-title h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.chevron {
  font-size: 11px;
  color: #64748b;
  transition: transform 0.2s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.details-content {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #e2e8f0;
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
}

.info-list {
  margin: 12px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  font-size: 13.5px;
}

.info-row dt {
  color: #64748b;
}

.info-row dd {
  margin: 0;
  color: #0f172a;
  font-weight: 500;
}

.capitalize {
  text-transform: capitalize;
}

/* Hobbies */
.hobbies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.hobby-pill {
  background-color: #eff6ff;
  color: #1d4ed8;
  font-size: 12.5px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid #dbeafe;
}
</style>
