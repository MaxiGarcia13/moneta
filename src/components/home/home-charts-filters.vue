<script setup lang="ts">
import type { HomeChartsFilters } from '@/composables/use-home-charts-filters';
import DateRangeFields from '@/components/ui/date-range-fields.vue';

const filters = defineModel<HomeChartsFilters>({ required: true });
</script>

<template>
  <div class="flex gap-4">
    <DateRangeFields
      v-model:issued-from="filters.issuedFrom"
      v-model:issued-to="filters.issuedTo"
      id-prefix="home-filter-issued"
      class="flex-1 max-w-56"
    />
  </div>
</template>
