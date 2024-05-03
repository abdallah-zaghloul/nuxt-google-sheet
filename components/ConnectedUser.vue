<script setup lang="ts">
import { SecondaryButton } from '@youcan/ui-vue3'

</script>

<template>
  <div class="container">
    <p>Connected as: <span>wiw@wiwi.com</span></p>
    <SecondaryButton class="disconnect">
      <template #icon>
        <i class="icon i-youcan:sign-out"></i>
      </template>
      Disconnect
    </SecondaryButton>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.container p {
  font: var(--text-sm-regular);
}

.container p span {
  color: var(--brand-500);
}

.container .disconnect {
  border-color: var(--brand-500);
}

:deep(
  .disconnect.base-button.secondary .text, 
  .disconnect.base-button.secondary .icon
) {
  color: var(--brand-500);
}

:deep(
  .disconnect.base-button.secondary:hover
) {
  background-color: var(--brand-500);
}
</style>