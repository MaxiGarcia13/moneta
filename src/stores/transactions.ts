import type {
  ListTransactionsParams,
  TransactionCategory,
  TransactionFilters,
  TransactionType,
} from '@/domain/transactions';
import { debounce } from '@maxigarcia/js-utils';
import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';

export const TRANSACTION_PAGE_SIZE = 20;
const FILTERS_DEBOUNCE_MS = 500;

const DIALOG_FILTER_KEYS = [
  'category',
  'type',
  'issuedFrom',
  'issuedTo',
] as const satisfies ReadonlyArray<keyof TransactionFilters>;

function createEmptyFilters(): TransactionFilters {
  return {
    title: '',
    category: '',
    type: '',
    issuedFrom: '',
    issuedTo: '',
  };
}

function countSetDialogFilters(source: TransactionFilters): number {
  return DIALOG_FILTER_KEYS.filter((key) => Boolean(source[key])).length;
}

export const useTransactionsStore = defineStore('transactions', () => {
  const draftFilters = reactive<TransactionFilters>(createEmptyFilters());
  const filters = reactive<TransactionFilters>(createEmptyFilters());

  const offset = ref(0);
  const limit = TRANSACTION_PAGE_SIZE;

  const commitTitle = debounce(() => {
    filters.title = draftFilters.title;
    offset.value = 0;
  }, FILTERS_DEBOUNCE_MS);

  watch(
    () => draftFilters.title,
    () => {
      void commitTitle();
    },
  );

  function syncDraftDialogFilters() {
    for (const key of DIALOG_FILTER_KEYS) {
      draftFilters[key] = filters[key];
    }
  }

  function applyDraftFilters() {
    for (const key of DIALOG_FILTER_KEYS) {
      filters[key] = draftFilters[key];
    }
    offset.value = 0;
  }

  const activeDialogFilterCount = computed(() => countSetDialogFilters(filters));

  const listParams = computed<ListTransactionsParams>(() => ({
    limit,
    offset: offset.value,
    title: filters.title.trim() || undefined,
    category: filters.category
      ? (filters.category as TransactionCategory)
      : null,
    type: filters.type
      ? (filters.type as TransactionType)
      : null,
    issuedFrom: filters.issuedFrom
      ? new Date(`${filters.issuedFrom}T00:00:00`).toISOString()
      : null,
    issuedTo: filters.issuedTo
      ? new Date(`${filters.issuedTo}T23:59:59.999`).toISOString()
      : null,
  }));

  return {
    draftFilters,
    filters,
    offset,
    limit,
    listParams,
    activeDialogFilterCount,
    syncDraftDialogFilters,
    applyDraftFilters,
  };
});
