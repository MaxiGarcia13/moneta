<script setup lang="ts">
import type { HomeChartsFilters } from '@/composables/use-home-charts-filters';
import DateRangeFields from '@/components/ui/date-range-fields.vue';

const filters = defineModel<HomeChartsFilters>({ required: true });
</script>

<template>
  <div class="grid grid-cols-2 gap-4 *:min-w-0">
    <DateRangeFields
      v-model:issued-from="filters.issuedFrom"
      v-model:issued-to="filters.issuedTo"
      id-prefix="home-filter-issued"
    />
  </div>
</template>
