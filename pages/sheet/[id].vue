<script setup lang="ts">
const route = useRoute();

</script>

<template>
  <div class="container">
    <BackNavButton to="/" label="Back to sheets" />
    <Card>
      <template #header>
        <h2>Create Sheet</h2>
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
.header {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
