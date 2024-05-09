<script setup lang="ts">

defineProps<{
  to: string
  label: string
}>();

</script>

<template>
  <div class="container">
    <NuxtLink class="link" :to="to">
      <i class="i-youcan:caret-left"></i>
      {{ label }}
    </NuxtLink>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-block-end: 16px;
}

.link {
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: var(--brand-500);
  transition: color 0.2s ease-in;
  font: var(--text-sm-medium);
}

.link:hover {
  color: var(--brand-600);
}
</style>