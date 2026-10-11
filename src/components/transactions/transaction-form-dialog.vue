<script setup lang="ts">
import type { Transaction } from '@/domain/transactions';
import { computed, ref, useId, useTemplateRef } from 'vue';
import TransactionForm from '@/components/transactions/transaction-form.vue';
import Button from '@/components/ui/button.vue';
import Dialog from '@/components/ui/dialog.vue';

const formId = useId();

const dialogRef = useTemplateRef<{
  showModal: () => void;
  close: () => void;
}>('dialog');

const formRef = useTemplateRef<{
  isSubmitting: boolean;
}>('form');

const formKey = ref(0);
const transaction = ref<Transaction | null>(null);

const isEditing = computed(() => transaction.value != null);
const isSubmitting = computed(() => formRef.value?.isSubmitting ?? false);

function showModal(nextTransaction?: Transaction | null) {
  transaction.value = nextTransaction ?? null;
  formKey.value += 1;
  dialogRef.value?.showModal();
}

function onSuccess() {
  dialogRef.value?.close();
}

defineExpose({
  showModal,
});
</script>

<template>
  <Dialog
    ref="dialog"
    class="w-full max-w-md"
  >
    <template #header>
      {{ isEditing ? 'Edit transaction' : 'New transaction' }}
    </template>

    <TransactionForm
      :key="formKey"
      ref="form"
      :transaction="transaction"
      hide-submit
      :form-id="formId"
      @success="onSuccess"
    />

    <template #footer>
      <Button
        variant="ghost"
        size="sm"
        @click="dialogRef?.close()"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        size="sm"
        :form="formId"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Saving…' : 'Save transaction' }}
      </Button>
    </template>
  </Dialog>
</template>
