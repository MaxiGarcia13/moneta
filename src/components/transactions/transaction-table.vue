<script setup lang="ts">
import type { Transaction } from '@/domain/transactions';
import TransactionTableHeader from '@/components/transactions/transaction-table-header.vue';
import TransactionTableRow from '@/components/transactions/transaction-table-row.vue';

defineProps<{
  transactions: Transaction[];
}>();
</script>

<template>
  <div class="min-h-0 flex-1 overflow-auto rounded-xl border border-border">
    <table class="w-full min-w-150 border-collapse text-left text-sm">
      <TransactionTableHeader />
      <tbody>
        <TransactionTableRow
          v-for="transaction in transactions"
          :key="transaction.id"
          :issued-at="transaction.issued_at"
          :title="transaction.title"
          :type="transaction.type"
          :category="transaction.category"
          :amount="transaction.amount"
        />
      </tbody>
    </table>
  </div>
</template>
