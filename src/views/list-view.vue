<script setup lang="ts">
import AppHeader from '@/components/layout/app-header.vue';
import TransactionFilters from '@/components/transactions/transaction-filters.vue';
import TransactionList from '@/components/transactions/transaction-list.vue';
</script>

<template>
  <AppHeader />

  <main class="py-8">
    <div class="flex flex-col gap-6 animate-[fade-up_0.5s_ease-out]">
      <h1 class="text-2xl font-medium tracking-tight">
        Transactions
      </h1>

      <TransactionFilters />
      <TransactionList />
    </div>
  </main>
</template>
