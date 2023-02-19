<template lang="pug">
#registration
  h1.poppins.fs_3.fw_6 Register
  OryFlow(
    v-if='registrationFlow'
    form-id='registration-form'
    :flow='registrationFlow'
    title='Register'
  )
</template>

<script setup lang="ts">
import { RegistrationFlow } from 'authclient091';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { $ory } from '../plugins/ory';
import { injectStrict } from '../utils';
import { makeHandleGetFlowError } from '../utils/flows';

const ory = injectStrict($ory);
const route = useRoute();
const router = useRouter();
const registrationFlow = ref<RegistrationFlow | undefined>();
const handleGetFlowError = makeHandleGetFlowError(router);

// check if we have a flow param
const { flow, returnTo } = route.query;

const initializeSelfServiceRegistrationFlowForBrowsers = () =>
  ory
    .createBrowserRegistrationFlow()
    .then((resp) => {
      registrationFlow.value = resp;
      router.replace({
        query: {
          flow: resp.id,
        },
      });
    })
    .catch(handleGetFlowError);

if (typeof flow !== 'string') {
  // if there's no flow in our route,
  // we need to initialize our registration flow
  initializeSelfServiceRegistrationFlowForBrowsers();
} else {
  ory
    .getRegistrationFlow({id: flow})
    .then((resp) => {
      registrationFlow.value = resp;
    })
    .catch(handleGetFlowError);
}
</script>

<style scoped lang="scss">
#registration {
  margin: var(--space-5) auto 0 auto;
  padding: 0 var(--space-3);
  width: 250px;
}
</style>
