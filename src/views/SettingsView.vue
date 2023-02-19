<template lang="pug">
#settings
  h1.poppins.fs_3.fw_6 Recover your password
  OryFlow(
    v-if='settingsFlow'
    form-id='settings-form'
    :flow='settingsFlow'
    title='Login'
  )
</template>

<script setup lang="ts">

import { SettingsFlow } from 'authclient091';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { $ory } from '../plugins/ory';
import { injectStrict } from '../utils';
import { makeHandleGetFlowError } from '../utils/flows';

const ory = injectStrict($ory);
const route = useRoute();
const router = useRouter();
const settingsFlow = ref<SettingsFlow | undefined>();
const handleGetFlowError = makeHandleGetFlowError(router);

// check if we have a flow param
const { protocol, host } = window.document.location;
const { flow, returnTo = `${protocol}//${host}/app` } = route.query;

const initializeSelfServiceSettingsFlowForBrowsers = () =>
  ory.createBrowserSettingsFlow()
    .then((resp) => {
      settingsFlow.value = resp;
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
  initializeSelfServiceSettingsFlowForBrowsers();
} else {
  ory
    .getSettingsFlow({id:flow})
    .then((resp) => {
      settingsFlow.value = resp;
    })
    .catch(handleGetFlowError);
}
</script>

<style scoped lang="scss">
#settings {
  margin: var(--space-5) auto 0 auto;
  padding: 0 var(--space-3);
  width: 250px;
}
</style>
