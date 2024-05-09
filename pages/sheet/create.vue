<script setup lang="ts">
import type { Sheet } from '../../components/utils/types'
import { toast } from '@youcan/ui-vue3/helpers';
import type { ToastOptions } from '@youcan/ui-vue3/types';
import { useApi } from '~/composables/useApi';


async function handleSubmit(sheet: Sheet) {
  // Won't use validator as it is an overkill, only one field is required: name.
  if (!sheet?.name) {
    const toastOptions: ToastOptions = {
    title: 'Name is required',
    description: 'Name cannot be empty',
    type: 'error',
  };
    toast.show(toastOptions);
  } else {
    // Send request
    const res = await createSheet(sheet);
  }
}

async function createSheet(sheet: Sheet) {
  // Call API
  return
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
        <SheetConfiguration :onSubmit="handleSubmit" />
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
