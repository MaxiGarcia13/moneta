<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <div
    class="animate-pulse rounded-xl bg-surface-raised"
    v-bind="$attrs"
    aria-hidden="true"
  />
</template>
