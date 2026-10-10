<script setup lang="ts">
import Input from '@/components/ui/input.vue';
import Select from '@/components/ui/select.vue';
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from '@/domain/transactions';
import { useTransactionsStore } from '@/stores/transactions';
import { formatEnumLabel } from '@/utils/format-enum-label';

const transactionsStore = useTransactionsStore();

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
  <div class="grid gap-4 sm:grid-cols-2">
    <Select
      id="filter-type"
      v-model="transactionsStore.draftFilters.type"
      label="Type"
      :options="typeOptions"
      empty-label="All"
    />

    <Select
      id="filter-category"
      v-model="transactionsStore.draftFilters.category"
      label="Category"
      :options="categoryOptions"
      empty-label="All"
    />

    <Input
      id="filter-issued-from"
      v-model="transactionsStore.draftFilters.issuedFrom"
      label="From"
      type="date"
    />

    <Input
      id="filter-issued-to"
      v-model="transactionsStore.draftFilters.issuedTo"
      label="To"
      type="date"
    />
  </div>
</template>
