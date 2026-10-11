<script setup lang="ts">
import type { IncomeSpendFilters } from '@/composables/use-income-spend-filters';
import { reactive, useTemplateRef } from 'vue';
import Dialog from '@/components/ui/dialog.vue';
import FiltersDialogActions from '@/components/ui/filters-dialog-actions.vue';
import Input from '@/components/ui/input.vue';
import { getDefaultIncomeSpendDateRange } from '@/utils/month-bounds';

const filters = defineModel<IncomeSpendFilters>({ required: true });

const dialogRef = useTemplateRef<{
  showModal: () => void;
  close: () => void;
}>('dialog');

const draft = reactive({
  issuedFrom: '',
  issuedTo: '',
});

function syncDraft() {
  draft.issuedFrom = filters.value.issuedFrom;
  draft.issuedTo = filters.value.issuedTo;
}

function showModal() {
  syncDraft();
  dialogRef.value?.showModal();
}

function applyFilters() {
  filters.value = {
    issuedFrom: draft.issuedFrom,
    issuedTo: draft.issuedTo,
  };
  dialogRef.value?.close();
}

function clearFilters() {
  const defaults = getDefaultIncomeSpendDateRange();
  draft.issuedFrom = defaults.issuedFrom;
  draft.issuedTo = defaults.issuedTo;
}

defineExpose({
  showModal,
});
</script>

<template>
  <Dialog
    ref="dialog"
    class="w-full max-w-lg"
    @close="syncDraft"
  >
    <template #header>
      Date range
    </template>

    <div class="grid gap-4 sm:grid-cols-2">
      <Input
        id="income-spend-filter-from"
        v-model="draft.issuedFrom"
        label="From"
        type="date"
      />
      <Input
        id="income-spend-filter-to"
        v-model="draft.issuedTo"
        label="To"
        type="date"
      />
    </div>

    <template #footer>
      <FiltersDialogActions
        @clear="clearFilters"
        @cancel="dialogRef?.close()"
        @apply="applyFilters"
      />
    </template>
  </Dialog>
</template>
