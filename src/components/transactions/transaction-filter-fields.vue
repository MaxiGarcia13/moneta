<script setup lang="ts">
import CategorySelect from '@/components/transactions/category-select.vue';
import TransactionTypeSelect from '@/components/transactions/transaction-type-select.vue';
import DateRangeFields from '@/components/ui/date-range-fields.vue';
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

    <DateRangeFields
      v-model:issued-from="transactionsStore.draftFilters.issuedFrom"
      v-model:issued-to="transactionsStore.draftFilters.issuedTo"
      id-prefix="filter-issued"
    />
  </div>
</template>
