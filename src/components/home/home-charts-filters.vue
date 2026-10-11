<script setup lang="ts">
import type { HomeChartsFilters } from '@/composables/use-home-charts-filters';
import CategorySelect from '@/components/transactions/category-select.vue';
import Input from '@/components/ui/input.vue';

const filters = defineModel<HomeChartsFilters>({ required: true });
</script>

<template>
  <div class="grid gap-4 grid-cols-3">
    <Input
      id="home-filter-issued-from"
      v-model="filters.issuedFrom"
      label="From"
      type="date"
    />

    <Input
      id="home-filter-issued-to"
      v-model="filters.issuedTo"
      label="To"
      type="date"
    />

    <CategorySelect
      id="home-filter-category"
      v-model="filters.category"
      empty-label="All"
      include-uncategorized
    />
  </div>
</template>
