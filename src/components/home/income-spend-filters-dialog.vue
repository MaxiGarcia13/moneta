<script setup lang="ts">
import type { IncomeSpendFilters } from '@/composables/use-income-spend-filters';
import { reactive, useTemplateRef } from 'vue';
import Button from '@/components/ui/button.vue';
import Dialog from '@/components/ui/dialog.vue';
import Input from '@/components/ui/input.vue';
import { getDefaultHomeDateRange } from '@/utils/month-bounds';

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
  filters.value = getDefaultHomeDateRange();
  dialogRef.value?.close();
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
      <Button
        variant="ghost"
        size="sm"
        class="!text-danger hover:!border-danger/40 hover:!bg-danger/10"
        @click="clearFilters"
      >
        Clear filter
      </Button>
      <Button
        variant="ghost"
        size="sm"
        @click="dialogRef?.close()"
      >
        Cancel
      </Button>
      <Button
        size="sm"
        @click="applyFilters"
      >
        Apply
      </Button>
    </template>
  </Dialog>
</template>
