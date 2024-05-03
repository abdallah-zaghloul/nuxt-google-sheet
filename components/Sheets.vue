<script setup lang="ts">
import { PrimaryButton } from '@youcan/ui-vue3'
</script>

<template>
  <Card class="inner-card">
    <template #default>
      All sheets
    </template>
    <template #headerAccessory>
      <div class="actions">
        <PrimaryButton>
          wewe
        </PrimaryButton>
      </div>
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
</style>
