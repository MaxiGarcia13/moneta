<script setup lang="ts">
import type { HomeChartsFilters } from '@/composables/use-home-charts-filters';
import CategorySelect from '@/components/transactions/category-select.vue';
import DateRangeFields from '@/components/ui/date-range-fields.vue';

const props = defineProps<{
  hideCategoryFilter?: boolean;
}>();

const filters = defineModel<HomeChartsFilters>({ required: true });
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 *:min-w-0">
    <DateRangeFields
      v-model:issued-from="filters.issuedFrom"
      v-model:issued-to="filters.issuedTo"
      id-prefix="home-filter-issued"
    />

    <CategorySelect
      v-if="!props.hideCategoryFilter"
      id="home-filter-category"
      v-model="filters.category"
      empty-label="All"
      include-uncategorized
    />
  </div>
</template>
