<script setup lang="ts">
import "../assets/css/global.css"

const getSetting = await useApi.getSetting()
const setting = useSetting(getSetting.value)

if (setting && setting.value?.isConnected) {
  await navigateTo('/sheets')
}

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
        <SetupGuide />
        <Setting />
      </template>
    </Card>
  </div>
</template>
