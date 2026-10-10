<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import TransactionForm from '@/components/transactions/transaction-form.vue';
import Button from '@/components/ui/button.vue';
import Dialog from '@/components/ui/dialog.vue';

const FORM_ID = 'transaction-create-form';

const dialogRef = useTemplateRef<{
  showModal: () => void;
  close: () => void;
}>('dialog');

const formRef = useTemplateRef<{
  isSubmitting: boolean;
}>('form');

const formKey = ref(0);

const isSubmitting = computed(() => formRef.value?.isSubmitting ?? false);

function showModal() {
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
      New transaction
    </template>

    <TransactionForm
      :key="formKey"
      ref="form"
      hide-submit
      :form-id="FORM_ID"
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
        :form="FORM_ID"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Saving…' : 'Save transaction' }}
      </Button>
    </template>
  </Dialog>
</template>
