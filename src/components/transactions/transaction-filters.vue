<script setup lang="ts">
import Input from '@/components/ui/input.vue';
import Select from '@/components/ui/select.vue';
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from '@/domain/transactions';
import { formatEnumLabel } from '@/utils/format-enum-label';

export interface TransactionFiltersModel {
  title: string;
  category: string;
  type: string;
  issuedFrom: string;
  issuedTo: string;
}

const filters = defineModel<TransactionFiltersModel>({ required: true });

const typeOptions = TRANSACTION_TYPES.map((type) => ({
  value: type,
  label: formatEnumLabel(type),
}));

const categoryOptions = TRANSACTION_CATEGORIES.map((category) => ({
  value: category,
  label: formatEnumLabel(category),
}));
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <Input
      id="filter-title"
      v-model="filters.title"
      label="Title"
      type="search"
      autocomplete="off"
    />

    <Select
      id="filter-type"
      v-model="filters.type"
      label="Type"
      :options="typeOptions"
      empty-label="All"
    />

    <Select
      id="filter-category"
      v-model="filters.category"
      label="Category"
      :options="categoryOptions"
      empty-label="All"
    />

    <Input
      id="filter-issued-from"
      v-model="filters.issuedFrom"
      label="From"
      type="date"
    />

    <Input
      id="filter-issued-to"
      v-model="filters.issuedTo"
      label="To"
      type="date"
    />
  </div>
</template>
