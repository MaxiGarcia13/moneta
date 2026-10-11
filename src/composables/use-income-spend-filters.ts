import { computed, ref } from 'vue';
import { getDefaultIncomeSpendDateRange } from '@/utils/month-bounds';

export interface IncomeSpendFilters {
  issuedFrom: string;
  issuedTo: string;
}

function createDefaultFilters(): IncomeSpendFilters {
  return getDefaultIncomeSpendDateRange();
}

export function useIncomeSpendFilters() {
  const filters = ref<IncomeSpendFilters>(createDefaultFilters());

  const isDefaultRange = computed(() => {
    const defaults = getDefaultIncomeSpendDateRange();

    return filters.value.issuedFrom === defaults.issuedFrom
      && filters.value.issuedTo === defaults.issuedTo;
  });

  return {
    filters,
    isDefaultRange,
  };
}
