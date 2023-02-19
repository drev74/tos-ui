<template lang="pug">
#recovery
  h1.poppins.fs_3.fw_6 Recover your password
  OryFlow(
    v-if='recoveryFlow'
    form-id='recover-form'
    :flow='recoveryFlow'
    title='Login'
  )
</template>

<script setup lang="ts">

import { RecoveryFlow } from 'authclient091';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { $ory } from '../plugins/ory';
import { injectStrict } from '../utils';
import { makeHandleGetFlowError } from '../utils/flows';

const ory = injectStrict($ory);
const route = useRoute();
const router = useRouter();
const recoveryFlow = ref<RecoveryFlow | undefined>();
const handleGetFlowError = makeHandleGetFlowError(router);

// check if we have a flow param
const { flow, refresh, aal, returnTo } = route.query;

const initializeSelfServiceRecoveryFlowForBrowsers = () =>
  ory
    .createBrowserRecoveryFlow()
    .then((resp) => {
      recoveryFlow.value = resp;
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
  initializeSelfServiceRecoveryFlowForBrowsers();
} else {
  ory
    .getRecoveryFlow({id:flow})
    .then((resp) => {
      recoveryFlow.value = resp;
    })
    .catch(handleGetFlowError);
}
</script>

<style scoped lang="scss">
#recovery {
  margin: var(--space-5) auto 0 auto;
  padding: 0 var(--space-3);
  width: 250px;
}
</style>
