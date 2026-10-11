<script setup lang="ts">
import type {
  TransactionCategory,
  TransactionType,
} from '@/domain/transactions';
import { formatAmount } from '@/utils/format-amount';
import { formatDate } from '@/utils/format-date';
import { formatEnumLabel } from '@/utils/format-enum-label';
import { transactionTypeAmountClass } from '@/utils/transaction-type-amount-class';

withDefaults(
  defineProps<{
    issuedAt: string;
    title: string;
    type: TransactionType | string;
    category?: TransactionCategory | string | null;
    amount: number;
    truncateTitle?: boolean;
  }>(),
  {
    category: null,
    truncateTitle: false,
  },
);
</script>

<template>
  <tr class="border-t border-border">
    <slot name="leading" />
    <td class="whitespace-nowrap px-4 py-2 text-muted">
      {{ formatDate(issuedAt) }}
    </td>
    <td
      class="px-4 py-2 font-medium"
      :class="truncateTitle ? 'max-w-64' : undefined"
    >
      <span
        v-if="truncateTitle"
        class="block truncate"
        :title="title"
      >{{ title }}</span>
      <template v-else>
        {{ title }}
      </template>
      <slot name="title-extra" />
    </td>
    <td class="px-4 py-2 text-muted">
      {{ formatEnumLabel(type) }}
    </td>
    <td class="px-4 py-2 text-muted">
      {{ category ? formatEnumLabel(category) : '—' }}
    </td>
    <td
      class="px-4 py-2 text-right font-medium tabular-nums"
      :class="transactionTypeAmountClass(type)"
    >
      {{ formatAmount(amount) }}
    </td>
  </tr>
</template>
