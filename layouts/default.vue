<script setup lang="ts">

</script>

<template>
  <div class="app-wrapper">
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