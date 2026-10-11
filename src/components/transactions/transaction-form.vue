<script setup lang="ts">
import type {
  CreateTransactionInput,
  TransactionCategory,
  TransactionType,
} from '@/domain/transactions';
import { useQueryClient } from '@tanstack/vue-query';
import { reactive, ref } from 'vue';
import Button from '@/components/ui/button.vue';
import Input from '@/components/ui/input.vue';
import Select from '@/components/ui/select.vue';
import Textarea from '@/components/ui/textarea.vue';
import { TRANSACTIONS_QUERY_KEY } from '@/composables/use-transactions-query';
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from '@/domain/transactions';
import { createTransaction } from '@/services/transactions';
import { dateTimeLocalToIso } from '@/utils/date-time-local-to-iso';
import { toDateTimeLocalValue } from '@/utils/to-date-time-local-value';

withDefaults(
  defineProps<{
    hideSubmit?: boolean;
    formId?: string;
  }>(),
  {
    hideSubmit: false,
    formId: undefined,
  },
);

const emit = defineEmits<{
  success: [];
}>();

const queryClient = useQueryClient();

const form = reactive({
  title: '',
  amount: '',
  type: 'expense' as TransactionType,
  category: '' as TransactionCategory | '',
  description: '',
  issued_at: toDateTimeLocalValue(),
});

const fieldErrors = reactive<Partial<Record<keyof CreateTransactionInput, string>>>({});
const isSubmitting = ref(false);
const submitError = ref<string | null>(null);

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

function toCreateInput(): CreateTransactionInput {
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
  submitError.value = null;

  if (!validate()) {
    return;
  }

  isSubmitting.value = true;

  try {
    await createTransaction(toCreateInput());
    await queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
    emit('success');
  } catch (error) {
    submitError.value
      = error instanceof Error ? error.message : 'Failed to save transaction';
  } finally {
    isSubmitting.value = false;
  }
}

defineExpose({
  isSubmitting,
});
</script>

<template>
  <form
    :id="formId"
    class="flex flex-col gap-5"
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

    <Select
      id="transaction-type"
      v-model="form.type"
      label="Type"
      :options="TRANSACTION_TYPE_OPTIONS"
      :error="fieldErrors.type"
    />

    <Select
      id="transaction-category"
      v-model="form.category"
      label="Category"
      :options="TRANSACTION_CATEGORY_OPTIONS"
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
