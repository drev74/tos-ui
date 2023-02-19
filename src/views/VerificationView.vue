<template lang="pug">
#verification
  h1.poppins.fs_3.fw_6 Verify your account
  OryFlow(
    v-if='verificationFlow'
    form-id='verification-form'
    :flow='verificationFlow'
    title='Login'
  )
</template>

<script setup lang="ts">

import { VerificationFlow } from 'authclient091';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { $ory } from '../plugins/ory';
import { injectStrict } from '../utils';
import { makeHandleGetFlowError } from '../utils/flows';

const ory = injectStrict($ory);
const route = useRoute();
const router = useRouter();
const verificationFlow = ref<VerificationFlow | undefined>();
const handleGetFlowError = makeHandleGetFlowError(router);

// check if we have a flow param
const { protocol, host } = window.document.location;
const { flow, returnTo = `${protocol}//${host}/app` } = route.query;

const initializeSelfServiceVerificationFlowForBrowsers = () =>
  ory
    .createBrowserVerificationFlow()
    .then((resp) => {
      verificationFlow.value = resp;
      router.replace({
        query: {
          flow: resp.id,
        },
      });
    })
    .catch(handleGetFlowError);

if (typeof flow !== 'string') {
  // if there's no flow in our route,
  // we need to initialize our login flow
  initializeSelfServiceVerificationFlowForBrowsers();
} else {
  ory
    .getVerificationFlow({id:flow})
    .then((resp) => {
      verificationFlow.value = resp;
    })
    .catch(handleGetFlowError);
}
</script>

<style scoped lang="scss">
#verification {
  margin: var(--space-5) auto 0 auto;
  padding: 0 var(--space-3);
  width: 250px;
}
</style>
