<script setup lang="ts">
import Input from '@/components/ui/input.vue';
import Select from '@/components/ui/select.vue';
import { useTransactionsStore } from '@/stores/transactions';
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from '@/utils/transaction-select-options';

const transactionsStore = useTransactionsStore();
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <Select
      id="filter-type"
      v-model="transactionsStore.draftFilters.type"
      label="Type"
      :options="TRANSACTION_TYPE_OPTIONS"
      empty-label="All"
    />

    <Select
      id="filter-category"
      v-model="transactionsStore.draftFilters.category"
      label="Category"
      :options="TRANSACTION_CATEGORY_OPTIONS"
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
