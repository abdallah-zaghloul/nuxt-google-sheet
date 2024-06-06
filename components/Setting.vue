<script setup lang="ts">
import { Input, PrimaryButton, InputGroup } from '@youcan/ui-vue3'
import { required, maxLength, helpers } from "@vuelidate/validators"
import useValidator from '../composables/useValidator';

const setting = useSetting();
const { v$, onSubmit, hasError, errorMessage } = useValidator({
  rules: {
    clientId: {
      required,
      maxLength: maxLength(191),
    },
    clientSecret: {
      required,
      maxLength: maxLength(191),
      isClientSecret: helpers.withMessage('invalid client secret format', helpers.regex(/^[A-Za-z0-9_-]{24,}$/))
    },
  },
  data: setting,
  onPass: () => useApi.setSetting({
    ...setting.value,
    isConnected: true
  }),
})
</script>

<template>
  <Card class="inner-card">
    <template #default>
      <form class="content" action="/setting" method="post" @submit.prevent="onSubmit">
        <InputGroup>
          <template #label>
            Google App Client ID
          </template>
          <template #input>
          <Input id="clientId" :model-value="setting?.clientId" :placeholder="'Google Client ID'" />
          </template>
         
          
        </InputGroup>
        <InputGroup>
          <template #label>
            Google App Secret key
          </template>
          <template #input>
            <Input id="clientSecret" :model-value="setting?.clientSecret" :placeholder="'Google Client Secret'" />
          </template>
          
          
        </InputGroup>
        <div class="footer">
          <PrimaryButton type="submit">
            Connect account
          </PrimaryButton>
        </div>
      </form>
    </template>
  </Card>
</template>

<style scoped>
small {
  text-align: center;
  color: var(--red-500);
  display: block;
}

.inner-card {
  margin-top: 20px;
  background-color: var(--card-bg);
  border-color: var(--card-border-color);
  box-shadow: unset;
}

.inner-card .content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px
}

.inner-card .footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-column: span 2;
  padding-inline: 20px;
  padding-block-start: 20px;
  margin-inline: -20px;
  border-block-start: 1px solid var(--gray-200);
}
</style>