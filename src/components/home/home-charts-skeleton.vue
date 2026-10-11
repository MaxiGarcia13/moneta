<script setup lang="ts">
import Skeleton from '@/components/ui/skeleton.vue';
</script>

<template>
  <div
    class="flex flex-col gap-6"
    aria-busy="true"
    aria-label="Loading charts"
  >
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Skeleton class="h-20" />
      <Skeleton class="h-20" />
      <Skeleton class="h-20" />
      <Skeleton class="h-20" />
    </div>
    <Skeleton class="h-80" />
    <Skeleton class="h-80" />
  </div>
</template>
