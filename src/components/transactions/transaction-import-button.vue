<script setup lang="ts">
import UploadIcon from '@/components/icons/upload.vue';
import TransactionImportDialog from '@/components/transactions/transaction-import-dialog.vue';
import TransactionToolbarDialogButton from '@/components/transactions/transaction-toolbar-dialog-button.vue';
</script>

<template>
  <TransactionToolbarDialogButton
    label="Import"
    :dialog="TransactionImportDialog"
  >
    <template #icon>
      <UploadIcon class="size-4" />
    </template>
  </TransactionToolbarDialogButton>
</template>
