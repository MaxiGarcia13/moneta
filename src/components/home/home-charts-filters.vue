<script setup lang="ts">
import type { HomeChartsFilters } from '@/composables/use-home-charts-filters';
import CategorySelect from '@/components/transactions/category-select.vue';
import DateRangeFields from '@/components/ui/date-range-fields.vue';

const filters = defineModel<HomeChartsFilters>({ required: true });
</script>

<template>
  <div class="grid grid-cols-3 gap-2 sm:gap-4 [&>*]:min-w-0">
    <DateRangeFields
      id-prefix="home-filter-issued"
      v-model:issued-from="filters.issuedFrom"
      v-model:issued-to="filters.issuedTo"
    />

    <CategorySelect
      id="home-filter-category"
      v-model="filters.category"
      empty-label="All"
      include-uncategorized
    />
  </div>
</template>
