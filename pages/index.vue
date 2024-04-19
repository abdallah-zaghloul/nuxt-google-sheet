<script lang="ts">
export default {
  data() {
    const {data} = useFetch<any>('/setting', {method: 'GET'});
    return {
      data
    }
  }
}
</script>

<template>
  <div id="main-container" class="container">
    <learn-connect v-if="!data?.setting"/>
    <about-features v-if="!data?.setting"/>
    <get-started v-if="!data?.setting"/>
    <setting :setting="data?.setting" :storeId="data?.storeId"/>
  </div>
</template>

<style>
html {
  background-color: white;
  font: var(--text-sm-regular);
}
</style>