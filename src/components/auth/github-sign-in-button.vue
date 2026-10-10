<script setup lang="ts">
import GithubIcon from '@/components/icons/github-icon.vue';
import AppButton from '@/components/ui/app-button.vue';

defineProps<{
  loading?: boolean;
}>();

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <AppButton
    :disabled="loading"
    @click="$emit('click', $event)"
  >
    <GithubIcon class="size-5" />
    <span class="font-medium">
      {{ loading ? 'Redirecting…' : 'Continue with GitHub' }}
    </span>
  </AppButton>
</template>
