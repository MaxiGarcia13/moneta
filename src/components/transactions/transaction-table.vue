<script setup lang="ts">
import type { Transaction } from '@/domain/transactions';
import TransactionDeleteButton from '@/components/transactions/transaction-delete-button.vue';
import TransactionTableHeader from '@/components/transactions/transaction-table-header.vue';
import TransactionTableRow from '@/components/transactions/transaction-table-row.vue';
import { useTransactionsStore } from '@/stores/transactions';

const props = defineProps<{
  transactions: Transaction[];
}>();

const transactionsStore = useTransactionsStore();

function onDeleteSuccess() {
  if (props.transactions.length === 1 && transactionsStore.offset > 0) {
    transactionsStore.offset = Math.max(
      0,
      transactionsStore.offset - transactionsStore.limit,
    );
  }
}
</script>

<template>
  <div class="min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-auto rounded-xl border border-border">
    <table class="w-full min-w-150 border-collapse text-left text-sm">
      <TransactionTableHeader>
        <template #trailing>
          <th class="w-12 px-2 py-2">
            <span class="sr-only">Actions</span>
          </th>
        </template>
      </TransactionTableHeader>
      <tbody>
        <TransactionTableRow
          v-for="transaction in transactions"
          :key="transaction.id"
          :issued-at="transaction.issued_at"
          :title="transaction.title"
          :type="transaction.type"
          :category="transaction.category"
          :amount="transaction.amount"
        >
          <template #trailing>
            <td class="px-2 py-2">
              <TransactionDeleteButton
                :id="transaction.id"
                :title="transaction.title"
                @success="onDeleteSuccess"
              />
            </td>
          </template>
        </TransactionTableRow>
      </tbody>
    </table>
  </div>
</template>
