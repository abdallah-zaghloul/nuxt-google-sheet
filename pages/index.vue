<script setup lang="ts">
import "../assets/css/global.css"

const getSetting = await useApi.getSetting()
const setting = useSetting(getSetting.value)

</script>

<template>
  <div id="main-container" class="container">
    <Card>
      <template #header>
        <h2 class="main-header">
          Google sheets
        </h2>
      </template>
      <template #default>
        <div v-if="!setting?.isConnected">
          <SetupGuide />
          <Setting />
        </div>
        <div v-else>
          <Sheets />
        </div>
        <NuxtLink to="/bulk-sync">
          Bulk Sync
        </NuxtLink>
      </template>
    </Card>
  </div>
</template>
