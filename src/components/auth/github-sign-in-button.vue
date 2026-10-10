<script setup lang="ts">
import GithubIcon from '@/components/icons/github-icon.vue';
import Button from '@/components/ui/button.vue';

defineProps<{
  loading?: boolean;
}>();

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <Button
    :disabled="loading"
    @click="$emit('click', $event)"
  >
    <GithubIcon class="size-5" />
    <span class="font-medium">
      {{ loading ? 'Redirecting…' : 'Continue with GitHub' }}
    </span>
  </Button>
</template>
