<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'raised' | 'ghost' | 'danger';
    size?: 'md' | 'sm';
    disabled?: boolean;
    type?: 'button' | 'submit';
  }>(),
  {
    variant: 'raised',
    size: 'md',
    disabled: false,
    type: 'button',
  },
);
</script>

<template>
  <button
    :type="type"
    class="inline-flex cursor-pointer items-center justify-center border border-border text-foreground transition-colors hover:border-accent-border hover:bg-accent-soft disabled:cursor-not-allowed disabled:hover:border-border disabled:opacity-60 disabled:user-select-none disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    :class="[
      variant === 'raised' ? 'bg-surface-raised' : 'bg-transparent',
      variant === 'danger' && 'text-danger! hover:border-danger/40! hover:bg-danger/10!',
      size === 'sm' ? 'gap-2 rounded-lg px-3 py-1.5 text-sm' : 'gap-2.5 rounded-xl px-5 py-3',
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
