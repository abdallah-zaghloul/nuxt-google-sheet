<script setup lang="ts">
import { Dropdown, InputGroup, TextArea } from '@youcan/ui-vue3';
import { ref } from 'vue';

// TODO: Fetch sheets and asign them to variable
const sheets = [
  { label: 'Apple watch orders', value: 1 },
  { label: 'MacBook Pro 14 Pro 512GB orders', value: 2 },
];
const sheetToSync = ref(null);
const ordersToSync = ref('');

function handleSubmit(e: Event) {
  e.preventDefault();
  // TODO: Sync orders with selected Google Sheet
}
</script>

<template>
  <div class="container">
    <BackNavButton to="/" label="Back to sheets"/>
    <Card>
      <form @submit="handleSubmit">
        <div class="form-container">
          <InputGroup>
            <template #label>
              Select a sheet to sync to
            </template>
            <template #input>
              <Dropdown
                v-model="sheetToSync"
                searchable
                :items="sheets"
                placeholder="Select sheet"
              />
            </template>
          </InputGroup>
          <InputGroup>
            <template #label>
              Orders refs to sync (1 ref per line without `#`)
            </template>
            <template #input>
              <TextArea
                v-model="ordersToSync"
                placeholder="AB123 &#10;KJ872"
              />
            </template>
          </InputGroup>
        </div>
        <div class="form-actions">
          <PrimaryButton type="submit">
            Sync Orders
          </PrimaryButton>
        </div>
      </form>
    </Card>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.form-container {
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-content: start;
  gap: 24px;
  padding-bottom: 16px;
}


.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-column: span 2;
  padding-inline: 20px;
  padding-block-start: 20px;
  margin-inline: -20px;
  border-block-start: 1px solid var(--gray-200);
}
</style>
