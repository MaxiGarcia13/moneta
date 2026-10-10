<script setup lang="ts">
import AppHeader from '@/components/layout/app-header.vue';
import TransactionCreateButton from '@/components/transactions/transaction-create-button.vue';
import TransactionFilters from '@/components/transactions/transaction-filters.vue';
import TransactionList from '@/components/transactions/transaction-list.vue';
</script>

<template>
  <AppHeader />

  <main class="py-8">
    <div class="flex flex-col gap-6 animate-[fade-up_0.5s_ease-out]">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <TransactionFilters />
        <TransactionCreateButton />
      </div>
      <TransactionList />
    </div>
  </main>
</template>
