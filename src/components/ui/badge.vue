<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'dot' | 'count';
  }>(),
  {
    variant: 'count',
  },
);
</script>

<template>
  <span
    class="absolute -top-2 -right-2 rounded-full"
    :class="
      variant === 'dot'
        ? 'size-2 bg-accent ring-2 ring-surface'
        : 'flex size-5 items-center justify-center bg-accent-soft text-xs font-medium text-foreground ring-1 ring-accent-border'
    "
  >
    <slot v-if="variant === 'count'" />
  </span>
</template>
