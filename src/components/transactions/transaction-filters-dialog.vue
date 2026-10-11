<script setup lang="ts">
import { useTemplateRef } from 'vue';
import TransactionFilterFields from '@/components/transactions/transaction-filter-fields.vue';
import Dialog from '@/components/ui/dialog.vue';
import FiltersDialogActions from '@/components/ui/filters-dialog-actions.vue';
import { useTransactionsStore } from '@/stores/transactions';

const transactionsStore = useTransactionsStore();

const dialogRef = useTemplateRef<{
  showModal: () => void;
  close: () => void;
}>('dialog');

function showModal() {
  transactionsStore.syncDraftDialogFilters();
  dialogRef.value?.showModal();
}

function applyFilters() {
  transactionsStore.applyDraftFilters();
  dialogRef.value?.close();
}

function clearFilters() {
  transactionsStore.clearDialogFilters();
}

function onDialogClose() {
  transactionsStore.syncDraftDialogFilters();
}

defineExpose({
  showModal,
});
</script>

<template>
  <Dialog
    ref="dialog"
    class="w-full max-w-lg"
    @close="onDialogClose"
  >
    <template #header>
      Filters
    </template>

    <TransactionFilterFields />

    <template #footer>
      <FiltersDialogActions
        @clear="clearFilters"
        @cancel="dialogRef?.close()"
        @apply="applyFilters"
      />
    </template>
  </Dialog>
</template>
