<script setup lang="ts">
import { useTemplateRef } from 'vue';
import UploadIcon from '@/components/icons/upload.vue';
import TransactionImportDialog from '@/components/transactions/transaction-import-dialog.vue';
import Button from '@/components/ui/button.vue';

const importDialogRef = useTemplateRef<{
  showModal: () => void;
}>('importDialog');

function openImportDialog() {
  importDialogRef.value?.showModal();
}
</script>

<template>
  <Button
    size="sm"
    class="h-11.5"
    @click="openImportDialog"
  >
    <UploadIcon class="size-4" />
    <span class="hidden md:block">Import</span>
  </Button>

  <TransactionImportDialog ref="importDialog" />
</template>
