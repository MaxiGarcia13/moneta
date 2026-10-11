<script setup lang="ts">
import type { TransactionFormInput } from '@/domain/transactions';
import { useQueryClient } from '@tanstack/vue-query';
import { computed, ref } from 'vue';
import TransactionImportDropzone from '@/components/transactions/transaction-import-dropzone.vue';
import TransactionImportPreview from '@/components/transactions/transaction-import-preview.vue';
import TransactionImportSummary from '@/components/transactions/transaction-import-summary.vue';
import Button from '@/components/ui/button.vue';
import { TRANSACTIONS_QUERY_KEY } from '@/composables/use-transactions-query';
import {
  markDuplicateMovements,
  parseAccountMovements,
} from '@/domain/transactions';
import {
  createTransactions,
  listTransactionsInIssuedRange,
} from '@/services/transactions';
import {
  endOfLocalDayIso,
  startOfLocalDayIso,
} from '@/utils/local-day-bounds';
import { readFileAsLatin1 } from '@/utils/read-file-as-latin1';

const emit = defineEmits<{
  cancel: [];
  success: [];
}>();

const queryClient = useQueryClient();

const movements = ref<TransactionFormInput[]>([]);
const selected = ref<boolean[]>([]);
const duplicates = ref<boolean[]>([]);
const parseError = ref<string | null>(null);
const submitError = ref<string | null>(null);
const isSubmitting = ref(false);
const isCheckingDuplicates = ref(false);
const fileName = ref<string | null>(null);

const selectedCount = computed(
  () => selected.value.filter(Boolean).length,
);

const duplicateCount = computed(
  () => duplicates.value.filter(Boolean).length,
);

const newCount = computed(
  () => movements.value.length - duplicateCount.value,
);

const hasPreview = computed(() => movements.value.length > 0);

const canSave = computed(
  () => hasPreview.value
    && selectedCount.value > 0
    && !isSubmitting.value
    && !isCheckingDuplicates.value,
);

function reset() {
  movements.value = [];
  selected.value = [];
  duplicates.value = [];
  parseError.value = null;
  submitError.value = null;
  isSubmitting.value = false;
  isCheckingDuplicates.value = false;
  fileName.value = null;
}

async function detectDuplicates(parsed: TransactionFormInput[]) {
  const issuedAts = parsed.map((movement) => movement.issued_at);
  const minIssuedAt = issuedAts.reduce((min, value) =>
    value < min ? value : min);
  const maxIssuedAt = issuedAts.reduce((max, value) =>
    value > max ? value : max);

  const existing = await listTransactionsInIssuedRange(
    startOfLocalDayIso(minIssuedAt),
    endOfLocalDayIso(maxIssuedAt),
  );
  const duplicateFlags = markDuplicateMovements(parsed, existing);

  duplicates.value = duplicateFlags;
  selected.value = duplicateFlags.map((isDuplicate) => !isDuplicate);
}

async function onFileSelect(file: File) {
  parseError.value = null;
  submitError.value = null;
  fileName.value = file.name;
  isCheckingDuplicates.value = true;

  try {
    const html = await readFileAsLatin1(file);
    const parsed = parseAccountMovements(html);
    movements.value = parsed;
    await detectDuplicates(parsed);
  } catch (error) {
    movements.value = [];
    selected.value = [];
    duplicates.value = [];
    parseError.value
      = error instanceof Error ? error.message : 'Failed to parse file';
  } finally {
    isCheckingDuplicates.value = false;
  }
}

async function save() {
  submitError.value = null;

  const inputs = movements.value.filter((_, index) =>
    selected.value[index] && !duplicates.value[index]);

  if (inputs.length === 0) {
    submitError.value = 'Select at least one transaction';
    return;
  }

  isSubmitting.value = true;

  try {
    await createTransactions(inputs);
    await queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
    emit('success');
  } catch (error) {
    submitError.value
      = error instanceof Error ? error.message : 'Failed to save transactions';
  } finally {
    isSubmitting.value = false;
  }
}

defineExpose({
  reset,
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <TransactionImportDropzone
      v-if="!hasPreview && !isCheckingDuplicates"
      @select="onFileSelect"
    />

    <p
      v-else-if="isCheckingDuplicates"
      class="text-sm text-muted"
    >
      Checking for existing transactions…
    </p>

    <template v-else>
      <TransactionImportSummary
        :file-name="fileName ?? ''"
        :new-count="newCount"
        :duplicate-count="duplicateCount"
        @clear="reset"
      />

      <TransactionImportPreview
        v-model:selected="selected"
        :movements="movements"
        :duplicates="duplicates"
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

    <div class="mt-6 flex justify-end gap-2">
      <Button
        variant="ghost"
        size="sm"
        @click="emit('cancel')"
      >
        Cancel
      </Button>
      <Button
        size="sm"
        :disabled="!canSave"
        @click="save"
      >
        {{ isSubmitting ? 'Saving…' : `Save ${selectedCount} transactions` }}
      </Button>
    </div>
  </div>
</template>
