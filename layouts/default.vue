<script setup lang="ts">
import { ToastContainer } from '@youcan/ui-vue3';
</script>

<template>
  <div class="app-wrapper">
    <ToastContainer :limit="3" position="top-right"/>
    <slot />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html {
  background-color: var(--gray-50);
  padding: 20px;
}

body {
  margin: 0;
  padding: 0;
}
</style>