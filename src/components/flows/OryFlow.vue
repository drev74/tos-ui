<template lang="pug">
.ory-flow
  form(
    :id='formId'
    :action='flow.ui.action'
    :method='flow.ui.method'
  )
    OryUiNode.ui-node(
      v-for='node in flow.ui.nodes'
      :key='getNodeId(node)'
      :id='getNodeId(node)'
      :node='node'
    )
  .messages(v-if='flow.ui.messages')
    OryUiMessage(
      v-for='message in flow.ui.messages'
      :message='message'
    )
</template>

<script setup lang="ts">
import { LoginFlow, RecoveryFlow, RegistrationFlow, SettingsFlow, VerificationFlow } from 'authclient091';


defineProps<{
  flow:
  | LoginFlow
  | RegistrationFlow
  | RecoveryFlow
  | SettingsFlow
  | VerificationFlow;
  formId?: string;
}>();
</script>

<style scoped lang="scss">
.ui-node+.ui-node {
  margin-top: var(--space-2);
}

.message {
  margin-top: var(--space-2);
}
</style>
