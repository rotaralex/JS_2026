<script setup lang="ts">
import type { Participant } from '../types/lottery'
import AppButton from './ui/AppButton.vue'

defineProps<{
  participants: Participant[]
  sortKey: 'name' | 'dob' | null
  sortOrder: 'asc' | 'desc'
}>()

defineEmits<{
  (e: 'sort', key: 'name' | 'dob'): void
  (e: 'edit', participant: Participant): void
  (e: 'delete', participant: Participant): void
}>()

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}
</script>

<template>
  <div class="table-card">
    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th class="col-num">#</th>
            <th class="clickable" @click="$emit('sort', 'name')">
              Name
              <span class="sort-icon">
                {{ sortKey === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : '↕' }}
              </span>
            </th>
            <th class="clickable" @click="$emit('sort', 'dob')">
              Date of Birth
              <span class="sort-icon">
                {{ sortKey === 'dob' ? (sortOrder === 'asc' ? '▲' : '▼') : '↕' }}
              </span>
            </th>
            <th>Email</th>
            <th>Phone number</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="participants.length === 0">
            <td colspan="6" class="empty-state">Список учасників пустий</td>
          </tr>
          <tr v-for="(p, idx) in participants" :key="p.id">
            <td class="col-num">{{ idx + 1 }}</td>
            <td class="fw-medium">{{ p.name }}</td>
            <td>{{ formatDate(p.dob) }}</td>
            <td>{{ p.email }}</td>
            <td>{{ p.phone }}</td>
            <td class="text-right">
              <div class="row-actions">
                <AppButton variant="secondary" @click="$emit('edit', p)">
                  Редагувати дані
                </AppButton>
                <AppButton variant="danger" @click="$emit('delete', p)"> Видалити </AppButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-card {
  background: #ffffff;
  border: 1px solid #eceff1;
  border-radius: 4px;
  overflow: hidden;
}

.table-responsive {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13.5px;

  th {
    padding: 16px;
    font-weight: 600;
    color: #4a5568;
    background-color: #fafbfc;
    border-bottom: 1px solid #edf2f7;

    &.clickable {
      cursor: pointer;
      user-select: none;
      &:hover {
        background-color: #f1f5f9;
      }
    }
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #4a5568;
  }

  tr:hover td {
    background-color: #fafbfc;
  }
}

.col-num {
  width: 48px;
  color: #a0aec0;
}

.sort-icon {
  margin-left: 4px;
  font-size: 11px;
  color: #718096;
}

.fw-medium {
  font-weight: 500;
  color: #1a202c;
}

.text-right {
  text-align: right;
}

.row-actions {
  display: inline-flex;
  gap: 8px;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #a0aec0;
}
</style>
