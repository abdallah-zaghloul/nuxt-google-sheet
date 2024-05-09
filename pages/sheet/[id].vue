<script setup lang="ts">
import type { Sheet } from '../../components/utils/types'


function handleSubmit(sheet: Sheet) {
  console.log("[id]: Submit", sheet);
}
</script>

<template>
  <div class="container">
    <BackNavButton to="/" label="Back to sheets" />
    <Card>
      <template #header>
        <h2>Create Sheet</h2>
      </template>
      <template #headerAccessory>
        <ConnectedUser />
      </template>
      <template #default>
        <SheetConfiguration 
          @submit="handleSubmit" 
          submitLabel="Create" 
          cancelLabel="Cancel"
        />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
