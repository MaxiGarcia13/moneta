<script setup lang="ts">
import { useTemplateRef } from 'vue';
import TransactionImportPanel from '@/components/transactions/transaction-import-panel.vue';
import Dialog from '@/components/ui/dialog.vue';

const dialogRef = useTemplateRef<{
  showModal: () => void;
  close: () => void;
}>('dialog');

const panelRef = useTemplateRef<{
  reset: () => void;
}>('panel');

function showModal() {
  panelRef.value?.reset();
  dialogRef.value?.showModal();
}

function close() {
  dialogRef.value?.close();
  panelRef.value?.reset();
}

defineExpose({
  showModal,
});
</script>

<template>
  <Dialog
    ref="dialog"
    class="w-full max-w-3xl"
  >
    <template #header>
      Import transactions
    </template>

    <TransactionImportPanel
      ref="panel"
      @cancel="close"
      @success="close"
    />
  </Dialog>
</template>
