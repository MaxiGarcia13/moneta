import type { MaybeRefOrGetter } from 'vue';
import type { HomeChartsFilters } from '@/composables/use-home-charts-filters';
import { computed, toValue } from 'vue';
import { useTransactionsInIssuedRangeQuery } from '@/composables/use-transactions-in-issued-range-query';
import { aggregateCategorySpend } from '@/domain/transactions';
import { getDefaultHomeDateRange } from '@/utils/month-bounds';
import { resolveIssuedDateRange } from '@/utils/resolve-issued-date-range';

const HOME_CHARTS_QUERY_KEY = 'home-charts' as const;

export function useHomeChartsQuery(
  filters: MaybeRefOrGetter<HomeChartsFilters>,
) {
  const resolvedFilters = computed(() => toValue(filters));
  const dateRange = computed(() => resolveIssuedDateRange(
    resolvedFilters.value,
    getDefaultHomeDateRange(),
  ));

  const query = useTransactionsInIssuedRangeQuery(
    HOME_CHARTS_QUERY_KEY,
    dateRange,
  );

  const transactions = computed(() => query.data.value ?? []);

  const kpis = computed(() => {
    let income = 0;
    let expense = 0;
    let investment = 0;

    for (const transaction of transactions.value) {
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
      net: income - expense - investment,
    };
  });

  const categorySpend = computed(() =>
    aggregateCategorySpend(transactions.value),
  );

  return {
    ...query,
    kpis,
    categorySpend,
  };
}
