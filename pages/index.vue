<script setup lang="ts">
const { data } = useFetch<any>('/setting', { method: 'GET' });

</script>

<template>
  <div id="main-container" class="container">
    <LearnConnect v-if="!data?.setting" />
    <AboutFeatures v-if="!data?.setting" />
    <GetStarted v-if="!data?.setting" />
    <Setting :setting="data?.setting" :storeId="data?.storeId" />
  </div>
</template>

<style>
html {
  background-color: white;
  font: var(--text-sm-regular);
}
</style>