<script setup lang="ts">
import { PrimaryButton, SecondaryButton } from '@youcan/ui-vue3'
</script>

<template>
  <Card class="inner-card">
    <template #headerAccessory>
      <div class="actions">
        <SecondaryButton class="bulk-sinc">
          <NuxtLink class="link" to="/bulk-sync">
            Bulk-sync orders
          </NuxtLink>
        </SecondaryButton>
        <PrimaryButton>
          <template #icon>
            <i class="i-youcan:plus"></i>
          </template>
          Create new sheet
        </PrimaryButton>
      </div>
    </template>
    <template #header>
      <h2>Your sheets</h2>
    </template>
    <template #default>
      <SheetsTable />
    </template>
  </Card>
</template>

<style scoped>
.inner-card {
  background-color: #fcfcfc;
  border-color: #e5e5e5;
  box-shadow: unset;
}
.inner-card .main-header {
  font-size: 15px;
}

.inner-card .actions {
  display: flex;
  gap: 8px
}

:deep(.base-button.secondary.bulk-sinc) {
  padding: 0;
}

.link {
  text-decoration: none;
  color: var(--base-black);
  padding: 12px 16px;
}
</style>
