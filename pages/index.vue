// pages/index.vue

<script setup lang="ts">
const {data: orders} = useFetch<{data: Record<string, {id:string}>}>('/orders');

if (process.client) {
  useQantra().toast.show({
    title: "Hello World",
    description: "This is a toast message"
  });
}
</script>

<template>
  <div v-for="order in orders?.data">
    {{ order.id }}
  </div>
</template>

<style>
html {
  background-color: white;
  font: var(--text-sm-regular);
}
</style>