<script setup lang="ts" generic="T extends Record<string, any>">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

defineProps<{
  value: T[]
  columns: { field: string; header: string }[]
  loading?: boolean
}>()
</script>

<template>
  <DataTable :value="value" :loading="loading" stripedRows responsiveLayout="scroll">
    <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header" />
    <slot name="actions" />
  </DataTable>
</template>
