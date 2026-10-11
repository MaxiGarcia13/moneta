import type {
  CategoryFilterValue,
  ListTransactionsParams,
  TransactionFilters,
  TransactionType,
} from '@/domain/transactions';
import { debounce } from '@maxigarcia/js-utils';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import {
  endOfLocalDayIso,
  startOfLocalDayIso,
} from '@/utils/local-day-bounds';

const TRANSACTION_PAGE_SIZE = 20;
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

  function clearDialogFilters() {
    for (const key of DIALOG_FILTER_KEYS) {
      draftFilters[key] = '';
    }
  }

  const activeDialogFilterCount = computed(() => countSetDialogFilters(filters));

  const listParams = computed<ListTransactionsParams>(() => ({
    limit,
    offset: offset.value,
    title: filters.title.trim() || undefined,
    category: filters.category
      ? (filters.category as CategoryFilterValue)
      : null,
    type: filters.type
      ? (filters.type as TransactionType)
      : null,
    issuedFrom: filters.issuedFrom
      ? startOfLocalDayIso(filters.issuedFrom)
      : null,
    issuedTo: filters.issuedTo
      ? endOfLocalDayIso(filters.issuedTo)
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
    clearDialogFilters,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionsStore, import.meta.hot));
}
