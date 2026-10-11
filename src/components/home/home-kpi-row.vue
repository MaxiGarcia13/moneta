<script setup lang="ts">
import { formatAmount } from '@/utils/format-amount';

defineProps<{
  income: number;
  expense: number;
  investment: number;
  net: number;
}>();
</script>

<template>
  <div class="grid gap-4 grid-cols-2 md:grid-cols-4">
    <div class="rounded-xl bg-surface p-4">
      <p class="text-sm text-muted">
        Income
      </p>
      <p class="mt-2 font-heading text-xl text-accent">
        {{ formatAmount(income) }}
      </p>
    </div>

    <div class="rounded-xl bg-surface p-4">
      <p class="text-sm text-muted">
        Expenses
      </p>
      <p class="mt-2 font-heading text-xl text-danger">
        {{ formatAmount(expense) }}
      </p>
    </div>

    <div class="rounded-xl bg-surface p-4">
      <p class="text-sm text-muted">
        Invested
      </p>
      <p class="mt-2 font-heading text-xl text-investment">
        {{ formatAmount(investment) }}
      </p>
    </div>

    <div class="rounded-xl bg-surface p-4">
      <p class="text-sm text-muted">
        Net
      </p>
      <p
        class="mt-2 font-heading text-xl"
        :class="net >= 0 ? 'text-accent' : 'text-danger'"
      >
        {{ formatAmount(net) }}
      </p>
    </div>
  </div>
</template>
