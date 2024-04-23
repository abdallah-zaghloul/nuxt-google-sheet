<script setup lang="ts">

const getSetting = await useApi.getSetting()
const setting = useSetting(getSetting.value)

</script>

<template>
  <div id="main-container" class="container">
    <LearnConnect v-if="!setting" />
    <AboutFeatures v-if="!setting" />
    <GetStarted v-if="!setting" />
    <Setting />
  </div>
</template>

<style>
html {
  background-color: white;
  font: var(--text-sm-regular);
}
</style>