<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'raised' | 'ghost';
    disabled?: boolean;
    type?: 'button' | 'submit';
  }>(),
  {
    variant: 'raised',
    disabled: false,
    type: 'button',
  },
);
</script>

<template>
  <button
    :type="type"
    class="mt-2 inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-border px-5 py-3 text-foreground transition-colors hover:border-accent-border hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    :class="variant === 'raised' ? 'bg-surface-raised' : 'bg-transparent'"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
