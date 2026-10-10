<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import TransactionPagination from '@/components/transactions/transaction-pagination.vue';
import TransactionTableSkeleton from '@/components/transactions/transaction-table-skeleton.vue';
import TransactionTable from '@/components/transactions/transaction-table.vue';
import { useTransactionsQuery } from '@/composables/use-transactions-query';
import { useTransactionsStore } from '@/stores/transactions';

const transactionsStore = useTransactionsStore();
const { listParams, offset } = storeToRefs(transactionsStore);

const { data, isPending, isError, error } = useTransactionsQuery(listParams);

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
  <div class="flex min-h-0 flex-1 flex-col gap-4">
    <TransactionTableSkeleton v-if="isPending" />

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
          class="shrink-0"
          :limit="transactionsStore.limit"
          :total="total"
        />
      </template>
    </template>
  </div>
</template>
