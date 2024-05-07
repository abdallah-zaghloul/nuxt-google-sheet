<script setup lang="ts">
import { InputGroup, Input, MultiselectDropdown, SecondaryButton } from '@youcan/ui-vue3'

const products: any[] = [];

const sheet = ref({
  name: '',
  prodcuts: [],
  fields: []
});
</script>

<template>
  <Card class="inner-card">
    <template #default>
      <form class="form">
        <InputGroup>
          <template #label>
            Sheet name
          </template>
          <template #input>
          <Input id="sheet-name" v-model="sheet.name" placeholder="My orders" />
          </template>
        </InputGroup>
        <InputGroup>
          <template #label>
            Filter by products (optional)
          </template>
          <template #input>
            <MultiselectDropdown
              v-model="sheet.prodcuts"
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
                <div class="list"></div>
              </div>
              <div class="">
                <i class="i-youcan:arrows-left-right"></i>
              </div>
              <div class="field-list all-fields">
                <div class="list-title">
                  <p>Available fields</p>
                </div>
                <div class="list"></div>
              </div>
            </div>
          </template>
        </InputGroup>
        <div class="footer">
          <SecondaryButton type="submit">
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit">
            Save
          </PrimaryButton>
        </div>
      </form>
    </template>
  </Card>
</template>

<style scoped>
.inner-card {
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.inner-card .fields .field-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--base-white);
  min-height: 300px;
  border: 1px solid var(--card-border-color);
  border-radius: 8px;
}

.inner-card .fields .field-list .list-title {
  background-color: var(--base-white);
  padding: 16px 24px;
  border-block-end: 1px solid var(--card-border-color);
  border-radius: 8px 8px 0 0;
}

.inner-card .fields .field-list .list-title p {
  font: var(--text-sm-medium);
}

.inner-card .fields .field-list .list {
  flex: 1;
  padding: 10px;
  box-shadow: inset 0 5px 10px var(--card-shadow);
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
</style>