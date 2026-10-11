<script setup lang="ts">
import type {
  Transaction,
  TransactionCategory,
  TransactionFormInput,
  TransactionType,
} from '@/domain/transactions';
import { useQueryClient } from '@tanstack/vue-query';
import { reactive } from 'vue';
import CategorySelect from '@/components/transactions/category-select.vue';
import TransactionTypeSelect from '@/components/transactions/transaction-type-select.vue';
import Button from '@/components/ui/button.vue';
import Input from '@/components/ui/input.vue';
import Textarea from '@/components/ui/textarea.vue';
import { useAsyncSubmit } from '@/composables/use-async-submit';
import { TRANSACTIONS_QUERY_KEY } from '@/composables/use-transactions-query';
import { createTransaction, updateTransaction } from '@/services/transactions';
import { dateTimeLocalToIso } from '@/utils/date-time-local-to-iso';
import { toDateTimeLocalValue } from '@/utils/to-date-time-local-value';

const props = withDefaults(
  defineProps<{
    transaction?: Transaction | null;
    hideSubmit?: boolean;
    formId?: string;
  }>(),
  {
    transaction: null,
    hideSubmit: false,
    formId: undefined,
  },
);

const emit = defineEmits<{
  success: [];
}>();

const queryClient = useQueryClient();

const form = reactive({
  title: props.transaction?.title ?? '',
  amount: props.transaction ? String(props.transaction.amount) : '',
  type: (props.transaction?.type ?? 'expense') as TransactionType,
  category: (props.transaction?.category ?? '') as TransactionCategory | '',
  description: props.transaction?.description ?? '',
  issued_at: props.transaction
    ? toDateTimeLocalValue(new Date(props.transaction.issued_at))
    : toDateTimeLocalValue(),
});

const fieldErrors = reactive<Partial<Record<keyof TransactionFormInput, string>>>({});

const {
  isSubmitting,
  submitError,
  clearSubmitError,
  runSubmit,
} = useAsyncSubmit('Failed to save transaction');

function validate(): boolean {
  fieldErrors.title = form.title.trim() ? undefined : 'Title is required';
  fieldErrors.amount
    = form.amount && Number(form.amount) > 0
      ? undefined
      : 'Enter an amount greater than 0';
  fieldErrors.type = form.type ? undefined : 'Type is required';
  fieldErrors.issued_at = form.issued_at ? undefined : 'Date and time are required';

  return !fieldErrors.title
    && !fieldErrors.amount
    && !fieldErrors.type
    && !fieldErrors.issued_at;
}

function toFormInput(): TransactionFormInput {
  return {
    title: form.title.trim(),
    amount: Number(form.amount),
    type: form.type,
    category: form.category || null,
    description: form.description.trim() || null,
    issued_at: dateTimeLocalToIso(form.issued_at),
  };
}

async function onSubmit() {
  clearSubmitError();

  if (!validate()) {
    return;
  }

  await runSubmit(async () => {
    const input = toFormInput();

    if (props.transaction) {
      await updateTransaction(props.transaction.id, input);
    } else {
      await createTransaction(input);
    }

    await queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
    emit('success');
  });
}

defineExpose({
  isSubmitting,
});
</script>

<template>
  <form
    :id="formId"
    class="flex flex-col gap-4"
    @submit.prevent="onSubmit"
  >
    <Input
      id="transaction-title"
      v-model="form.title"
      label="Title"
      autocomplete="off"
      :error="fieldErrors.title"
    />

    <Input
      id="transaction-amount"
      v-model="form.amount"
      label="Amount"
      type="number"
      min="0"
      step="0.01"
      inputmode="decimal"
      :error="fieldErrors.amount"
    />

    <TransactionTypeSelect
      id="transaction-type"
      v-model="form.type"
      :error="fieldErrors.type"
    />

    <CategorySelect
      id="transaction-category"
      v-model="form.category"
      empty-label="None"
    />

    <Input
      id="transaction-issued-at"
      v-model="form.issued_at"
      label="Date & time"
      type="datetime-local"
      :error="fieldErrors.issued_at"
    />

    <Textarea
      id="transaction-description"
      v-model="form.description"
      label="Description"
    />

    <p
      v-if="submitError"
      class="text-sm text-danger"
      role="alert"
    >
      {{ submitError }}
    </p>

    <Button
      v-if="!hideSubmit"
      type="submit"
      :disabled="isSubmitting"
    >
      {{ isSubmitting ? 'Saving…' : 'Save transaction' }}
    </Button>
  </form>
</template>
