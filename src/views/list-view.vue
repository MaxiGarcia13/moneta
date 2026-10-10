<script setup lang="ts">
import type { TransactionFiltersModel } from '@/components/transactions/transaction-filters.vue';
import type {
  ListTransactionsParams,
  TransactionCategory,
  TransactionType,
} from '@/domain/transactions';
import { computed, reactive, ref, watch } from 'vue';
import AppHeader from '@/components/layout/app-header.vue';
import TransactionFilters from '@/components/transactions/transaction-filters.vue';
import TransactionPagination from '@/components/transactions/transaction-pagination.vue';
import TransactionTable from '@/components/transactions/transaction-table.vue';
import { useTransactionsQuery } from '@/composables/use-transactions-query';

const PAGE_SIZE = 20;

const filters = reactive<TransactionFiltersModel>({
  title: '',
  category: '',
  type: '',
  issuedFrom: '',
  issuedTo: '',
});

const offset = ref(0);

watch(
  filters,
  () => {
    offset.value = 0;
  },
  { deep: true },
);

const params = computed<ListTransactionsParams>(() => ({
  limit: PAGE_SIZE,
  offset: offset.value,
  title: filters.title.trim() || undefined,
  category: filters.category
    ? (filters.category as TransactionCategory)
    : null,
  type: filters.type
    ? (filters.type as TransactionType)
    : null,
  issuedFrom: filters.issuedFrom
    ? new Date(`${filters.issuedFrom}T00:00:00`).toISOString()
    : null,
  issuedTo: filters.issuedTo
    ? new Date(`${filters.issuedTo}T23:59:59.999`).toISOString()
    : null,
}));

const { data, isPending, isError, error } = useTransactionsQuery(params);

const transactions = computed(() => data.value?.items ?? []);
const total = computed(() => data.value?.total ?? 0);
const errorMessage = computed(() => {
  if (!isError.value) {
    return null;
  }

  return error.value instanceof Error
    ? error.value.message
    : 'Failed to load transactions';
});
</script>

<template>
  <AppHeader />

  <main class="py-8">
    <div class="flex flex-col gap-6 animate-[fade-up_0.5s_ease-out]">
      <h1 class="text-2xl font-medium tracking-tight">
        Transactions
      </h1>

      <TransactionFilters v-model="filters" />

      <p
        v-if="isPending"
        class="text-sm text-muted"
      >
        Loading transactions…
      </p>

      <p
        v-else-if="errorMessage"
        class="text-sm text-danger"
        role="alert"
      >
        {{ errorMessage }}
      </p>

      <template v-else>
        <p
          v-if="transactions.length === 0"
          class="text-sm text-muted"
        >
          No transactions found
        </p>

        <template v-else>
          <TransactionTable :transactions="transactions" />
          <TransactionPagination
            v-model:offset="offset"
            :limit="PAGE_SIZE"
            :total="total"
          />
        </template>
      </template>
    </div>
  </main>
</template>
