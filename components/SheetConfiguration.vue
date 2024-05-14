<script setup lang="ts">
import draggable from "vuedraggable";
import { InputGroup, Input, MultiselectDropdown, SecondaryButton } from '@youcan/ui-vue3'
import { ref, unref } from 'vue'
import type { Field, Sheet, SheetConfigurationProps } from './utils/types'

const DEFAULT_FIELDS = [ { name: "Order ID", required: true } ]
const DEFAULT_SHEET: Sheet = {
  fields: DEFAULT_FIELDS,
  name: '',
  products: []
}

const { onSubmit, sheet } = withDefaults(defineProps<SheetConfigurationProps>(), {
  cancelLabel: 'Cancel',
  submitLabel: 'Save',
  onSubmit: () => {},
});

const allFields = ref<Field[]>([
  { name: "Order date" },
  { name: "First name" },
  { name: "Last name" },
]);

const defaultSheet = sheet ? sheet : DEFAULT_SHEET

const sheetRef = ref<Sheet>(defaultSheet);

const products: any[] = [];

async function handleSubmit() {
  await onSubmit(unref(sheetRef));
}
</script>

<template>
  <Card class="inner-card">
    <template #default>
      <form class="form" @submit.prevent="handleSubmit">
        <InputGroup>
          <template #label>
            Sheet name
          </template>
          <template #input>
          <Input id="sheet-name" v-model="sheetRef.name" placeholder="My orders" />
          </template>
        </InputGroup>
        <InputGroup>
          <template #label>
            Filter by products (optional)
          </template>
          <template #input>
            <MultiselectDropdown
              v-model="sheetRef.products"
              :searchable="true"
              :items="products"
              label="Search products"
            />
          </template>
        </InputGroup>
        <InputGroup>
          <template #label>
            Fields
          </template>
          <template #input>
            <div class="fields">
              <div class="field-list selected-fields">
                <div class="list-title">
                  <p>Selected fields</p>
                </div>
                <draggable 
                  v-model="sheetRef.fields" 
                  group="fields"  
                  item-key="id"
                  class="list">
                  <template #item="{element}">
                    <div class="draggable-field selected" :class="{ disabled: element.required }">
                      <i class="i-youcan:dots-six-vertical"></i>
                      <div class="field-content">
                        <span>{{element.name}}</span>
                        <span class="required" v-if="element.required">Required</span>
                      </div>
                    </div>
                  </template>
                </draggable>
              </div>
              <div class="separator">
                <i class="i-youcan:arrows-left-right"></i>
              </div>
              <div class="field-list all-fields">
                <div class="list-title">
                  <p>Available fields</p>
                </div>
                <div class="empty-state">
                  <span v-if="allFields.length === 0 && sheetRef.fields.length > 1">No more fields</span> 
                  <span v-else-if="allFields.length === 0">No fields available</span>
                </div>
                <draggable
                  v-model="allFields" 
                  group="fields"  
                  item-key="id"
                  class="list">
                  <template #item="{element}">
                    <div class="draggable-field">
                      <i class="i-youcan:dots-six-vertical"></i>
                      <div class="field-content">
                        {{element.name}}
                      </div>
                    </div>
                  </template>
                </draggable>
              </div>
            </div>
          </template>
        </InputGroup>
        <div class="footer">
          <NuxtLink to="/">
            <SecondaryButton type="submit">
              {{ cancelLabel }}
            </SecondaryButton>
          </NuxtLink>
          <PrimaryButton type="submit">
            {{submitLabel }}
          </PrimaryButton>
        </div>
      </form>
    </template>
  </Card>
</template>

<style scoped>
.inner-card {
  --card-height: 500px;

  background-color: #fcfcfc;
  border-color: #e5e5e5;
  box-shadow: unset;
}

.inner-card .form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.inner-card .fields {
  /* position: relative; */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
}

.inner-card .fields .field-list {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--base-white);
  height: var(--card-height);
  overflow: scroll;
  border: 1px solid var(--card-border-color);
  border-radius: 8px;
}

.inner-card .fields .all-fields .empty-state {
  position: absolute;
  inset-block: 50%;
  inset-inline: 50%;
  min-width: 100px;
  min-height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%);
  color: var(--gray-500);
}

.inner-card .fields .separator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--card-height);
}

.inner-card .fields .field-list .list-title {
  position: sticky;
  top: 0;
  padding: 16px 24px;
  border-radius: 8px 8px 0 0;
  background-color: var(--base-white);
  border-block-end: 1px solid var(--card-border-color);
  z-index: 1;
}

.inner-card .fields .field-list .list-title p {
  font: var(--text-sm-medium);
}

.inner-card .fields .field-list .list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: var(--gray-50);
  border-radius: 0 0 8px 8px;
  box-shadow: inset 0 5px 10px var(--card-shadow);
}

.draggable-field {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--base-white);
  border: 1px solid var(--card-border-color);
  border-radius: 8px;
  cursor: grab;
  transition: all 0.2s ease-in;
}

.draggable-field.disabled {
  cursor: unset;
  user-select: none;
  pointer-events: none;
  background-color: var(--gray-100);
  border-color: var(--gray-200);
  color: var(--gray-500)
}

.draggable-field:hover {
  border-color: var(--brand-100);
  background-color: var(--brand-50);
}

.draggable-field .field-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.draggable-field .field-content .required {
  font: var(--text-xs-regular);
}

.inner-card .footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding-inline: 20px;
  padding-block-start: 20px;
  margin-inline: -20px;
  margin-block-start: 16px;
  border-block-start: 1px solid var(--gray-200);
}
</style>./utils/sheet