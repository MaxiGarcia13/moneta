<script setup lang="ts">
import type { CreateTransactionInput } from '@/domain/transactions';
import { useQueryClient } from '@tanstack/vue-query';
import { computed, ref, useTemplateRef } from 'vue';
import TransactionImportDropzone from '@/components/transactions/transaction-import-dropzone.vue';
import TransactionImportPreview from '@/components/transactions/transaction-import-preview.vue';
import Button from '@/components/ui/button.vue';
import Dialog from '@/components/ui/dialog.vue';
import { TRANSACTIONS_QUERY_KEY } from '@/composables/use-transactions-query';
import { createTransactions } from '@/services/transactions';
import { parseAccountMovements } from '@/utils/parse-account-movements';
import { readFileAsLatin1 } from '@/utils/read-file-as-latin1';

const dialogRef = useTemplateRef<{
  showModal: () => void;
  close: () => void;
}>('dialog');

const queryClient = useQueryClient();

const movements = ref<CreateTransactionInput[]>([]);
const selected = ref<boolean[]>([]);
const parseError = ref<string | null>(null);
const submitError = ref<string | null>(null);
const isSubmitting = ref(false);
const fileName = ref<string | null>(null);

const selectedCount = computed(
  () => selected.value.filter(Boolean).length,
);

const hasPreview = computed(() => movements.value.length > 0);

function reset() {
  movements.value = [];
  selected.value = [];
  parseError.value = null;
  submitError.value = null;
  isSubmitting.value = false;
  fileName.value = null;
}

function showModal() {
  reset();
  dialogRef.value?.showModal();
}

function close() {
  dialogRef.value?.close();
  reset();
}

async function onFileSelect(file: File) {
  parseError.value = null;
  submitError.value = null;
  fileName.value = file.name;

  try {
    const html = await readFileAsLatin1(file);
    const parsed = parseAccountMovements(html);
    movements.value = parsed;
    selected.value = parsed.map(() => true);
  } catch (error) {
    movements.value = [];
    selected.value = [];
    parseError.value
      = error instanceof Error ? error.message : 'Failed to parse file';
  }
}

function clearFile() {
  movements.value = [];
  selected.value = [];
  parseError.value = null;
  submitError.value = null;
  fileName.value = null;
}

async function onSave() {
  submitError.value = null;

  const inputs = movements.value.filter((_, index) => selected.value[index]);

  if (inputs.length === 0) {
    submitError.value = 'Select at least one transaction';
    return;
  }

  isSubmitting.value = true;

  try {
    await createTransactions(inputs);
    await queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
    close();
  } catch (error) {
    submitError.value
      = error instanceof Error ? error.message : 'Failed to save transactions';
  } finally {
    isSubmitting.value = false;
  }
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

    <div class="flex flex-col gap-4">
      <TransactionImportDropzone
        v-if="!hasPreview"
        @select="onFileSelect"
      />

      <template v-else>
        <div class="flex items-center justify-between gap-3 text-sm">
          <p class="truncate text-muted">
            {{ fileName }} · {{ movements.length }} movements
          </p>
          <Button
            variant="ghost"
            size="sm"
            @click="clearFile"
          >
            Change file
          </Button>
        </div>

        <TransactionImportPreview
          v-model:selected="selected"
          :movements="movements"
        />
      </template>

      <p
        v-if="parseError"
        class="text-sm text-danger"
        role="alert"
      >
        {{ parseError }}
      </p>

      <p
        v-if="submitError"
        class="text-sm text-danger"
        role="alert"
      >
        {{ submitError }}
      </p>
    </div>

    <template #footer>
      <Button
        variant="ghost"
        size="sm"
        @click="close"
      >
        Cancel
      </Button>
      <Button
        size="sm"
        :disabled="!hasPreview || selectedCount === 0 || isSubmitting"
        @click="onSave"
      >
        {{ isSubmitting ? 'Saving…' : `Save ${selectedCount} transactions` }}
      </Button>
    </template>
  </Dialog>
</template>
