<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppHeader from '@/components/layout/app-header.vue';
import TransactionForm from '@/components/transactions/transaction-form.vue';

const router = useRouter();

function onSuccess() {
  router.push({ name: 'list' });
}
</script>

<template>
  <AppHeader />

  <main class="py-8">
    <div class="mx-auto flex max-w-md flex-col gap-6 animate-[fade-up_0.5s_ease-out]">
      <h1 class="text-2xl font-medium tracking-tight">
        New transaction
      </h1>
      <TransactionForm @success="onSuccess" />
    </div>
  </main>
</template>
