<script setup lang="ts">
import type { HomeChartsFilters } from '@/composables/use-home-charts-filters';
import Input from '@/components/ui/input.vue';
import Select from '@/components/ui/select.vue';
import { TRANSACTION_CATEGORY_OPTIONS } from '@/utils/transaction-select-options';

const filters = defineModel<HomeChartsFilters>({ required: true });
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-3">
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

    <Select
      id="home-filter-category"
      v-model="filters.category"
      label="Category"
      :options="TRANSACTION_CATEGORY_OPTIONS"
      empty-label="All"
    />
  </div>
</template>
