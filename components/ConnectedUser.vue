<script setup lang="ts">
import { SecondaryButton } from '@youcan/ui-vue3'
import { useSetting } from '~/composables/useStates';
const setting = useSetting();

async function disconnect() {
  // Disconnect
  useApi.setSetting({ ...setting.value, isConnected: false })
  // Redirect
  window.location.reload();
}
</script>

<template>
  <div class="container">
    <p v-if="setting?.email">Connected as: <span class="email">{{ setting?.email }}</span></p>
    <SecondaryButton class="disconnect" @click="disconnect">
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

:deep(
  .disconnect.base-button.secondary .icon
) {
  color: var(--gray-800);
}

.email {
  max-width: 300px;
  text-overflow: ellipsis;
}
</style>