<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTemplateRef } from 'vue';
import FilterIcon from '@/components/icons/filter.vue';
import TransactionFiltersDialog from '@/components/transactions/transaction-filters-dialog.vue';
import Badge from '@/components/ui/badge.vue';
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
  <div class="flex w-full min-w-0 items-end max-w-96">
    <Input
      id="filter-title"
      v-model="draftFilters.title"
      label="Title"
      type="search"
      autocomplete="off"
      class="min-w-0 flex-1"
      input-class="rounded-r-none border-r-0"
    />

    <Button
      variant="ghost"
      size="sm"
      class="relative shrink-0 h-10.5 rounded-l-none"
      aria-label="Open filters"
      @click="openFiltersDialog"
    >
      <FilterIcon class="size-5" />
      <Badge v-if="activeDialogFilterCount > 0">
        {{ activeDialogFilterCount }}
      </Badge>
    </Button>
  </div>

  <TransactionFiltersDialog ref="filtersDialog" />
</template>
