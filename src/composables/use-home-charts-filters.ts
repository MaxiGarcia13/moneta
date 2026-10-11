import { ref } from 'vue';
import { getDefaultHomeDateRange } from '@/utils/month-bounds';

export interface HomeChartsFilters {
  issuedFrom: string;
  issuedTo: string;
}

function createDefaultFilters(): HomeChartsFilters {
  const { issuedFrom, issuedTo } = getDefaultHomeDateRange();

  return {
    issuedFrom,
    issuedTo,
  };
}

export function useHomeChartsFilters() {
  const filters = ref<HomeChartsFilters>(createDefaultFilters());

  return { filters };
}
