<script setup lang="ts">
import {Input, PrimaryButton} from '@youcan/ui-vue3';
import useVuelidate from "@vuelidate/core";
import {required, maxLength} from "@vuelidate/validators";
import {ref} from "@vue/reactivity";

defineProps({
  setting: {
    type: Object,
    default: null
  }
})

const formData = ref({
      clientId: '',
      clientSecret: '',
      // isConnected: '',
    }),
    rules = {
      clientId: {required},
      clientSecret: {required},
      // isConnected: {required},
    },
    v$ = useVuelidate(rules, formData),
    submitForm = async () => {
      const passed = await v$.value.$validate()
      if (passed)
        alert('success')
      else
        alert('failed')
    };


</script>

<template>
  <div v-if="setting">

    <label>Google Client ID</label>
    <Input id="clientId" :model-value="setting.clientId" :placeholder="'Google Client ID'"/>

    <label>Google Client Secret</label>
    <Input id="clientSecret" :model-value="setting.clientSecret" :placeholder="'Google Client Secret'"/>

    <PrimaryButton v-if="!setting?.isConnected">
      <i class="i-youcan:sign-out"></i>
      Connect account
    </PrimaryButton>

  </div>
</template>

<style scoped>
#clientId, #clientSecret {
  margin: 10px;
}
</style>