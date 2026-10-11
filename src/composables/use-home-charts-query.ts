import type { MaybeRefOrGetter } from 'vue';
import type { HomeChartsFilters } from '@/composables/use-home-charts-filters';
import type { TransactionCategory } from '@/domain/transactions';
import { useQuery } from '@tanstack/vue-query';
import { computed, toValue } from 'vue';
import { TRANSACTIONS_QUERY_KEY } from '@/composables/use-transactions-query';
import { listTransactionsInIssuedRange } from '@/services/transactions';
import { aggregateCategorySpend } from '@/utils/aggregate-category-spend';
import {
  endOfLocalDayIso,
  startOfLocalDayIso,
} from '@/utils/local-day-bounds';
import { getDefaultHomeDateRange } from '@/utils/month-bounds';

export const HOME_CHARTS_QUERY_KEY = 'home-charts' as const;

function resolveDateRange(filters: HomeChartsFilters) {
  const defaults = getDefaultHomeDateRange();
  const issuedFrom = filters.issuedFrom || defaults.issuedFrom;
  const issuedTo = filters.issuedTo || defaults.issuedTo;

  return {
    issuedFrom,
    issuedTo,
    issuedFromIso: startOfLocalDayIso(issuedFrom),
    issuedToIso: endOfLocalDayIso(issuedTo),
  };
}

export function useHomeChartsQuery(
  filters: MaybeRefOrGetter<HomeChartsFilters>,
) {
  const resolvedFilters = computed(() => toValue(filters));
  const dateRange = computed(() => resolveDateRange(resolvedFilters.value));

  const queryKeyRange = computed(() => ({
    issuedFrom: dateRange.value.issuedFromIso,
    issuedTo: dateRange.value.issuedToIso,
  }));

  const query = useQuery({
    queryKey: [
      TRANSACTIONS_QUERY_KEY,
      HOME_CHARTS_QUERY_KEY,
      queryKeyRange,
    ],
    queryFn: () => listTransactionsInIssuedRange(
      queryKeyRange.value.issuedFrom,
      queryKeyRange.value.issuedTo,
    ),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 30,
  });

  const filteredTransactions = computed(() => {
    const items = query.data.value ?? [];
    const category = resolvedFilters.value.category;

    if (!category) {
      return items;
    }

    return items.filter(
      (transaction) => transaction.category === (category as TransactionCategory),
    );
  });

  const kpis = computed(() => {
    let income = 0;
    let expense = 0;
    let investment = 0;

    for (const transaction of filteredTransactions.value) {
      if (transaction.type === 'income') {
        income += transaction.amount;
      } else if (transaction.type === 'expense') {
        expense += transaction.amount;
      } else if (transaction.type === 'investment') {
        investment += transaction.amount;
      }
    }

    return {
      income,
      expense,
      investment,
      net: income - expense,
    };
  });

  const categorySpend = computed(() =>
    aggregateCategorySpend(filteredTransactions.value),
  );

  return {
    ...query,
    kpis,
    categorySpend,
  };
}
