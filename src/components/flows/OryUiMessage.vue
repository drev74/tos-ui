<template lang="pug">
.message(:class='message.type')
	p.open-sans.fs_2 {{ message.text }}
</template>

<script setup lang="ts">import { UiText } from 'authclient091';


defineProps<{
  message: UiText;
}>();
</script>

<style scoped>
.message.error {
  color: var(--color-error);
}
</style>
