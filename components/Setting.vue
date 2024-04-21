<script setup lang="ts">
import { Input, PrimaryButton } from '@youcan/ui-vue3'
import useVuelidate from "@vuelidate/core"
import { required, maxLength, helpers } from "@vuelidate/validators"
import { ref, computed } from "@vue/reactivity"
import { toRefs } from "@vue/reactivity";
// import { toast } from "@youcan/qantra";

const props = defineProps({
  storeId: {
    type: String
  },
  setting: {
    type: Object,
    default: null
  }
})

const { setting, storeId } = toRefs(props)
const rules = computed(() => ({
  clientId: {
    required,
    maxLength: maxLength(191),
    isClientId: helpers.withMessage('invalid client id format', helpers.regex(/^\d{12}-[a-zA-Z0-9_]+\.apps\.googleusercontent\.com$/))
  },
  clientSecret: {
    required,
    maxLength: maxLength(191),
    isClientSecret: helpers.withMessage('invalid client secret format', helpers.regex(/^[A-Za-z0-9_-]{24,}$/))
  },
}))
const v$ = useVuelidate(rules, setting)

async function submitForm() {
  await v$.value.$validate()
  if (!v$.value.$error)
    await upsertRecord()
}

async function upsertRecord() {
  await $fetch('/setting', {
    method: "POST",
    body: {
      clientId: setting.value.clientId,
      clientSecret: setting.value.clientSecret,
      storeId: storeId.value,
      isConnected: setting.value.isConnected,
    },
  }).then((record) => {
    ({
      storeId: storeId.value,
      clientId: setting.value.clientId,
      clientSecret: setting.value.clientSecret,
      isConnected: setting.value.isConnected
    } = record)

    /** alert success
     toast.show({
     title: "Stored Successfully",
     description: "Your Google Client Setting stored successfully"
     });
     */
  })
}

</script>

<template>
  <div v-if="setting">
    <form action="/setting" method="post" @submit.prevent="submitForm">

      <label>Google Client ID</label>
      <Input id="clientId" v-model="setting.clientId" :placeholder="'Google Client ID'" />
      <small v-if="v$.clientId.$error">{{ v$.clientId.$errors[0].$message }}</small>

      <label>Google Client Secret</label>
      <Input id="clientSecret" v-model="setting.clientSecret" :placeholder="'Google Client Secret'" />
      <small v-if="v$.clientSecret.$error">{{ v$.clientSecret.$errors[0].$message }}</small>


      <PrimaryButton type="submit" v-if="!setting?.isConnected">Connect account</PrimaryButton>
    </form>

  </div>
</template>

<style scoped>
#clientId,
#clientSecret {
  display: block;
  margin: 1%
}

label {
  display: block;
}

small {
  text-align: center;
  color: red;
  display: block;
}
</style>