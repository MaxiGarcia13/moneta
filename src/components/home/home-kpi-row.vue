<script setup lang="ts">
import { formatAmount } from '@/utils/format-amount';

defineProps<{
  income: number;
  expense: number;
  net: number;
}>();
</script>

<template>
  <div class="grid gap-3 sm:grid-cols-3">
    <div class="rounded-xl bg-surface px-4 py-3">
      <p class="text-sm text-muted">
        Income
      </p>
      <p class="mt-1 font-heading text-xl text-accent">
        {{ formatAmount(income) }}
      </p>
    </div>

    <div class="rounded-xl bg-surface px-4 py-3">
      <p class="text-sm text-muted">
        Expenses
      </p>
      <p class="mt-1 font-heading text-xl text-danger">
        {{ formatAmount(expense) }}
      </p>
    </div>

    <div class="rounded-xl bg-surface px-4 py-3">
      <p class="text-sm text-muted">
        Net
      </p>
      <p
        class="mt-1 font-heading text-xl"
        :class="net >= 0 ? 'text-accent' : 'text-danger'"
      >
        {{ formatAmount(net) }}
      </p>
    </div>
  </div>
</template>
