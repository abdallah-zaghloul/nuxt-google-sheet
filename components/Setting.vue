<script setup lang="ts">
import { Input, PrimaryButton, InputGroup } from '@youcan/ui-vue3'
import { required, maxLength, helpers } from "@vuelidate/validators"
import useValidator from '~/composables/useValidator';
import { useSetting } from '~/composables/useStates';

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
  onPass: () => useApi.setSetting(setting.value!),
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
          <Input id="clientId" v-model="setting.clientId" :placeholder="'Google Client ID'" />
          </template>
          <template v-if="hasError(v$, 'clientId')" #error>
            <small>{{ errorMessage(v$, 'clientId') }}</small>
          </template>
        </InputGroup>
        <InputGroup>
          <template #label>
            Google App Secret key
          </template>
          <template #input>
            <Input id="clientSecret" v-model="setting.clientSecret" :placeholder="'Google Client Secret'" />
          </template>
          <template v-if="hasError(v$, 'clientSecret')" #error>
            <small>{{ errorMessage(v$, 'clientSecret') }}</small>
          </template>
        </InputGroup>
        <div class="footer">
          <PrimaryButton type="submit">
            <template #icon>
              <i class="i-youcan:arrows-left-right"></i>
            </template>
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
  background-color: #fcfcfc;
  border-color: #e5e5e5;
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