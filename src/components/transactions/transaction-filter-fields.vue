<script setup lang="ts">
import CategorySelect from '@/components/transactions/category-select.vue';
import TransactionTypeSelect from '@/components/transactions/transaction-type-select.vue';
import Input from '@/components/ui/input.vue';
import { useTransactionsStore } from '@/stores/transactions';

const transactionsStore = useTransactionsStore();
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <TransactionTypeSelect
      id="filter-type"
      v-model="transactionsStore.draftFilters.type"
      empty-label="All"
    />

    <CategorySelect
      id="filter-category"
      v-model="transactionsStore.draftFilters.category"
      empty-label="All"
      include-uncategorized
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
