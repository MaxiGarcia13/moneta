<script setup lang="ts">
import PlusIcon from '@/components/icons/plus.vue';
import TransactionFormDialog from '@/components/transactions/transaction-form-dialog.vue';
import TransactionToolbarDialogButton from '@/components/transactions/transaction-toolbar-dialog-button.vue';
</script>

<template>
  <TransactionToolbarDialogButton
    label="New"
    :dialog="TransactionFormDialog"
  >
    <template #icon>
      <PlusIcon class="size-4" />
    </template>
  </TransactionToolbarDialogButton>
</template>
