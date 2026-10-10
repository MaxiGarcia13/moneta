import { reactive } from 'vue';
import { getDefaultHomeDateRange } from '@/utils/month-bounds';

export interface HomeChartsFilters {
  issuedFrom: string;
  issuedTo: string;
  category: string;
}

function createDefaultFilters(): HomeChartsFilters {
  const { issuedFrom, issuedTo } = getDefaultHomeDateRange();

  return {
    issuedFrom,
    issuedTo,
    category: '',
  };
}

export function useHomeChartsFilters() {
  const filters = reactive<HomeChartsFilters>(createDefaultFilters());

  return { filters };
}
