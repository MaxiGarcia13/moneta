<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  src?: string | null;
  name: string;
}>();

const initials = computed(() => {
  const parts = props.name.trim().split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
  }

  return props.name.slice(0, 2).toUpperCase();
});
</script>

<template>
  <img
    v-if="src"
    :src="src"
    :alt="`${name} avatar`"
    class="size-8 rounded-full object-cover ring-1 ring-border"
    width="32"
    height="32"
    referrerpolicy="no-referrer"
  >
  <span
    v-else
    class="inline-flex size-8 items-center justify-center rounded-full bg-surface-raised text-xs font-medium text-muted ring-1 ring-border"
    aria-hidden="true"
  >
    {{ initials }}
  </span>
</template>
