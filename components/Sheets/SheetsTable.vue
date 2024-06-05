<script setup lang="ts">
import { Table } from '@youcan/ui-vue3'
import { columns, actions } from './helpers'

const sheets = await useApi.getSheets().then(
  sheets => sheets.map(sheet => ({
    row: {
      id: sheet.id,
      name: sheet.title,
      status: {
        variant: 'toggle',
        data: {
          status: sheet.status,
        },
      },
      googleUrl: sheet.googleUrl
    }
  }))
)

</script>

<template>
  <Table v-if="sheets.length > 0" :columns="columns" :data="sheets" :actions="actions" />
  <div v-else class="empty-state">
    <img src="/assets/images/empty-state.webp" alt="Discover Nuxt 3" />
    <p>Add your first sheet to get started.</p>
  </div>
</template>

<style scoped>
.empty-state {
  padding-block: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.empty-state p {
  color: var(--gray-400)
}

.empty-state img {
  width: 200px;
}
</style>
