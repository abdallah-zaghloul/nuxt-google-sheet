<script setup lang="ts">
import "../assets/css/global.css"

const getSetting = await useApi.getSetting()
const setting = useSetting(getSetting.value)

</script>

<template>
  <div id="main-container" class="container">
    <SetupGuide />
    <Setting />
  </div>
</template>
