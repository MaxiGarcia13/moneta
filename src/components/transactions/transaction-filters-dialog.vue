<script setup lang="ts">
import { useTemplateRef } from 'vue';
import TransactionFilterFields from '@/components/transactions/transaction-filter-fields.vue';
import Button from '@/components/ui/button.vue';
import Dialog from '@/components/ui/dialog.vue';
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
  dialogRef.value?.close();
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
      <Button
        variant="ghost"
        size="sm"
        class="!text-danger hover:!border-danger/40 hover:!bg-danger/10"
        @click="clearFilters"
      >
        Clear filter
      </Button>
      <Button
        variant="ghost"
        size="sm"
        @click="dialogRef?.close()"
      >
        Cancel
      </Button>
      <Button
        size="sm"
        @click="applyFilters"
      >
        Apply
      </Button>
    </template>
  </Dialog>
</template>
