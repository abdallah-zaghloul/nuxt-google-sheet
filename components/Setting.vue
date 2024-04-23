<script setup lang="ts">
import { Input, PrimaryButton } from '@youcan/ui-vue3'
import { required, maxLength, helpers } from "@vuelidate/validators"
import useValidator from '~/composables/useValidator';
import { useSetting } from '~/composables/useStates';

const setting = useSetting();
const { v$, onSubmit, hasError, errorMessage } = useValidator({
  rules: {
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
  },
  data: setting,
  onPass: () => useApi.setSetting(setting.value!),
})
</script>

<template>
  <div v-if="setting">
    <form action="/setting" method="post" @submit.prevent="onSubmit">

      <label>Google Client ID</label>
      <Input id="clientId" v-model="setting.clientId" :placeholder="'Google Client ID'" />
      <small v-if="hasError(v$, 'clientId')">{{ errorMessage(v$, 'clientId') }}</small>

      <label>Google Client Secret</label>
      <Input id="clientSecret" v-model="setting.clientSecret" :placeholder="'Google Client Secret'" />
      <small v-if="hasError(v$, 'clientSecret')">{{ errorMessage(v$, 'clientSecret') }}</small>


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