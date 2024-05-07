<script setup lang="ts">
const route = useRoute();

</script>

<template>
  <div class="container">
    <Card>
      <template #header>
        <BackNavButton to="/" label="Back to sheets" />
      </template>
      <template #headerAccessory>
        <ConnectedUser />
      </template>
      <template #default>
        <SheetConfiguration />
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>
