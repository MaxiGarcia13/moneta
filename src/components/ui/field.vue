<script setup lang="ts">
defineProps<{
  label: string;
  forId: string;
  error?: string | null;
}>();
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      :for="forId"
      class="text-sm font-medium text-muted"
    >
      {{ label }}
    </label>
    <slot />
    <p
      v-if="error"
      class="text-sm text-danger"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>
