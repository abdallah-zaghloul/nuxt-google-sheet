<script setup lang="ts">
import Setting from "~/components/setting.vue";
import LearnConnect from "../components/learn-connect.vue";

const {data: setting} = useFetch<typeof prisma.setting| null>('/setting', {method: 'GET'});

</script>

<template>
  <div id="main-container" class="container">
    <learn-connect v-if="!setting"/>
    <setting :setting="setting"/>
  </div>
</template>

<style>
html {
  background-color: white;
  font: var(--text-sm-regular);
}
</style>