import { computed, ref } from 'vue';
import { getDefaultHomeDateRange } from '@/utils/month-bounds';

export interface IncomeSpendFilters {
  issuedFrom: string;
  issuedTo: string;
}

function createDefaultFilters(): IncomeSpendFilters {
  return getDefaultHomeDateRange();
}

export function useIncomeSpendFilters() {
  const filters = ref<IncomeSpendFilters>(createDefaultFilters());

  const isDefaultRange = computed(() => {
    const defaults = getDefaultHomeDateRange();

    return filters.value.issuedFrom === defaults.issuedFrom
      && filters.value.issuedTo === defaults.issuedTo;
  });

  return {
    filters,
    isDefaultRange,
  };
}
