import { createStorage } from '@maxigarcia/js-utils';
import { ref, watch } from 'vue';
import { getDefaultHomeDateRange } from '@/utils/month-bounds';
import { readStoredJson } from '@/utils/read-stored-json';

export interface HomeChartsFilters {
  issuedFrom: string;
  issuedTo: string;
}

const filtersStorage = createStorage<HomeChartsFilters>('home-charts-filters');

function createDefaultFilters(): HomeChartsFilters {
  const { issuedFrom, issuedTo } = getDefaultHomeDateRange();

  return {
    issuedFrom,
    issuedTo,
  };
}

export function useHomeChartsFilters() {
  const filters = ref<HomeChartsFilters>(
    readStoredJson(
      filtersStorage,
      createDefaultFilters,
      (value) => Boolean(value.issuedFrom && value.issuedTo),
    ),
  );

  watch(
    filters,
    (value) => {
      filtersStorage.setJson(value);
    },
    { deep: true },
  );

  return { filters };
}
