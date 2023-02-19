<template lang="pug">
#login
  h1.poppins.fs_3.fw_6 Login
  OryFlow(
    v-if='loginFlow'
    form-id='login-form'
    :flow='loginFlow'
    title='Login'
  )
  .links
    RouterLink(to='/registration') Sign Up
    RouterLink(to='/recovery') Forgot Password?
</template>

<script setup lang="ts">

import { LoginFlow } from 'authclient091';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { $ory } from '../plugins/ory';
import { injectStrict } from '../utils';
import { makeHandleGetFlowError } from '../utils/flows';

const ory = injectStrict($ory);
const route = useRoute();
const router = useRouter();
const loginFlow = ref<LoginFlow | undefined>();
const handleGetFlowError = makeHandleGetFlowError(router);

// check if we have a flow param
const { flow, refresh, aal, returnTo } = route.query;

const initializeSelfServiceLoginFlowForBrowsers = () =>
  ory
    .createBrowserLoginFlow({
      refresh: Boolean(refresh),
      aal: aal ? String(aal) : undefined,
      returnTo: returnTo ? String(returnTo) : undefined
    }
    )
    .then((resp) => {
      loginFlow.value = resp
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
  initializeSelfServiceLoginFlowForBrowsers();
} else {
  ory
    .getLoginFlow({id:flow})
    .then((resp) => {
      loginFlow.value = resp;
    })
    .catch(handleGetFlowError);
}
</script>

<style scoped lang="scss">
#login {
  margin: var(--space-5) auto 0 auto;
  width: 250px;

  .links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--space-3);
  }
}
</style>
