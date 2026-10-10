<script setup lang="ts">
import type { Transaction } from '@/domain/transactions';
import { formatAmount } from '@/utils/format-amount';
import { formatDate } from '@/utils/format-date';
import { formatEnumLabel } from '@/utils/format-enum-label';

defineProps<{
  transactions: Transaction[];
}>();
</script>

<template>
  <div class="overflow-x-auto rounded-xl border border-border">
    <table class="w-full min-w-150 border-collapse text-left text-sm">
      <thead class="bg-surface-raised text-muted">
        <tr>
          <th class="px-4 py-3 font-medium">
            Date
          </th>
          <th class="px-4 py-3 font-medium">
            Title
          </th>
          <th class="px-4 py-3 font-medium">
            Type
          </th>
          <th class="px-4 py-3 font-medium">
            Category
          </th>
          <th class="px-4 py-3 text-right font-medium">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in transactions"
          :key="transaction.id"
          class="border-t border-border"
        >
          <td class="whitespace-nowrap px-4 py-3 text-muted">
            {{ formatDate(transaction.issued_at) }}
          </td>
          <td class="px-4 py-3 font-medium">
            {{ transaction.title }}
          </td>
          <td class="px-4 py-3 text-muted">
            {{ formatEnumLabel(transaction.type) }}
          </td>
          <td class="px-4 py-3 text-muted">
            {{ transaction.category ? formatEnumLabel(transaction.category) : '—' }}
          </td>
          <td
            class="px-4 py-3 text-right font-medium tabular-nums"
            :class="transaction.type === 'income' ? 'text-accent' : 'text-danger'"
          >
            {{ formatAmount(transaction.amount) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
