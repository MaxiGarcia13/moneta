<script setup lang="ts">
import AppHeader from '@/components/layout/app-header.vue';
import TransactionCreateButton from '@/components/transactions/transaction-create-button.vue';
import TransactionFilters from '@/components/transactions/transaction-filters.vue';
import TransactionImportButton from '@/components/transactions/transaction-import-button.vue';
import TransactionList from '@/components/transactions/transaction-list.vue';
</script>

<template>
  <AppHeader />

  <main class="min-w-0 pt-8 pb-24 md:pb-8">
    <div class="flex min-h-0 min-w-0 flex-1 flex-col gap-6 animate-[fade-up_0.5s_ease-out]">
      <div class="flex shrink-0 items-end justify-between gap-2 sm:gap-4">
        <div class="min-w-0 flex-1">
          <TransactionFilters />
        </div>
        <div class="flex shrink-0 items-center gap-2">
          <TransactionImportButton />
          <TransactionCreateButton />
        </div>
      </div>
      <TransactionList />
    </div>
  </main>
</template>
