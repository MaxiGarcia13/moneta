<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <div
    class="animate-pulse rounded bg-surface-raised"
    v-bind="$attrs"
    aria-hidden="true"
  />
</template>
