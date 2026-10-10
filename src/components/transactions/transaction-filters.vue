<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTemplateRef } from 'vue';
import FilterIcon from '@/components/icons/filter.vue';
import TransactionFiltersDialog from '@/components/transactions/transaction-filters-dialog.vue';
import Button from '@/components/ui/button.vue';
import Input from '@/components/ui/input.vue';
import { useTransactionsStore } from '@/stores/transactions';

const transactionsStore = useTransactionsStore();
const { draftFilters, activeDialogFilterCount } = storeToRefs(transactionsStore);

const filtersDialogRef = useTemplateRef<{
  showModal: () => void;
}>('filtersDialog');

function openFiltersDialog() {
  filtersDialogRef.value?.showModal();
}
</script>

<template>
  <div class="flex items-end">
    <Input
      id="filter-title"
      v-model="draftFilters.title"
      label="Title"
      type="search"
      autocomplete="off"
      class="min-w-0 flex-1 max-w-96"
      input-class="rounded-r-none border-r-0"
    />

    <Button
      variant="ghost"
      size="sm"
      class="relative shrink-0 h-11.5 rounded-l-none"
      aria-label="Open filters"
      @click="openFiltersDialog"
    >
      <FilterIcon class="size-5" />
      <span
        v-if="activeDialogFilterCount > 0"
        class="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-foreground ring-1 ring-accent-border"
      >
        {{ activeDialogFilterCount }}
      </span>
    </Button>
  </div>

  <TransactionFiltersDialog ref="filtersDialog" />
</template>
