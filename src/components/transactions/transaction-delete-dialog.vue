<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { useTemplateRef } from 'vue';
import Button from '@/components/ui/button.vue';
import Dialog from '@/components/ui/dialog.vue';
import { useAsyncSubmit } from '@/composables/use-async-submit';
import { TRANSACTIONS_QUERY_KEY } from '@/composables/use-transactions-query';
import { deleteTransaction } from '@/services/transactions';

const props = defineProps<{
  transaction: { id: number; title: string } | null;
}>();

const emit = defineEmits<{
  success: [];
}>();

const queryClient = useQueryClient();

const dialogRef = useTemplateRef<{
  showModal: () => void;
  close: () => void;
}>('dialog');

const {
  isSubmitting,
  submitError,
  clearSubmitError,
  runSubmit,
} = useAsyncSubmit('Failed to remove transaction');

function showModal() {
  clearSubmitError();
  dialogRef.value?.showModal();
}

async function onConfirm() {
  if (!props.transaction) {
    return;
  }

  const { id } = props.transaction;

  await runSubmit(async () => {
    await deleteTransaction(id);
    await queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
    dialogRef.value?.close();
    emit('success');
  });
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
      Remove transaction?
    </template>

    <p
      v-if="transaction"
      class="text-sm text-muted"
    >
      This will permanently remove “{{ transaction.title }}”.
    </p>

    <p
      v-if="submitError"
      class="mt-4 text-sm text-danger"
      role="alert"
    >
      {{ submitError }}
    </p>

    <template #footer>
      <Button
        variant="ghost"
        size="sm"
        :disabled="isSubmitting"
        @click="dialogRef?.close()"
      >
        Cancel
      </Button>
      <Button
        variant="danger"
        size="sm"
        :disabled="isSubmitting || !transaction"
        @click="onConfirm"
      >
        {{ isSubmitting ? 'Removing…' : 'Remove' }}
      </Button>
    </template>
  </Dialog>
</template>
