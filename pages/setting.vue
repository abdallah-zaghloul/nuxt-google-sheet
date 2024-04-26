<script setup lang="ts">

useYoucanSession()
const setting = useSetting()

</script>

<template>
  <div id="main-container" class="container">
    <LearnConnect v-if="!setting" />
    <Setting :setting="setting" />
  </div>
</template>

<style>
html {
  background-color: white;
  font: var(--text-sm-regular);
}
</style>