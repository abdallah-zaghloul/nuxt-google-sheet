<script setup lang="ts">
</script>

<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header"/>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--base-white);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  box-shadow: 0 5px 20px var(--gray-100);
}

.card .card-header {
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-block-end: 1px solid var(--gray-200);
}

.card .card-header,
.card .card-body {
  padding: 20px;
}

.card .card-header {
  font-weight: 600;
  font-size: 16px;
}
</style>