<script setup lang="ts">
import TransactionTableHeader from '@/components/transactions/transaction-table-header.vue';
import Skeleton from '@/components/ui/skeleton.vue';

const SKELETON_ROW_COUNT = 8;
const skeletonRows = Array.from({ length: SKELETON_ROW_COUNT }, (_, index) => index);
</script>

<template>
  <div
    class="min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-auto rounded-xl border border-border"
    aria-busy="true"
    aria-label="Loading transactions"
  >
    <table class="w-full min-w-150 border-collapse text-left text-sm">
      <TransactionTableHeader />
      <tbody>
        <tr
          v-for="row in skeletonRows"
          :key="row"
          class="border-t border-border"
        >
          <td class="px-4 py-2">
            <Skeleton class="h-4 w-20" />
          </td>
          <td class="px-4 py-2">
            <Skeleton class="h-4 w-36" />
          </td>
          <td class="px-4 py-2">
            <Skeleton class="h-4 w-16" />
          </td>
          <td class="px-4 py-2">
            <Skeleton class="h-4 w-24" />
          </td>
          <td class="px-4 py-2 text-right">
            <Skeleton class="inline-block h-4 w-16" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
