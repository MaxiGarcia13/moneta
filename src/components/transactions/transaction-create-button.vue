<script setup lang="ts">
import { useTemplateRef } from 'vue';
import TransactionFormDialog from '@/components/transactions/transaction-form-dialog.vue';
import Button from '@/components/ui/button.vue';

const formDialogRef = useTemplateRef<{
  showModal: () => void;
}>('formDialog');

function openFormDialog() {
  formDialogRef.value?.showModal();
}
</script>

<template>
  <Button
    size="sm"
    class="h-11.5"
    @click="openFormDialog"
  >
    New
  </Button>

  <TransactionFormDialog ref="formDialog" />
</template>
