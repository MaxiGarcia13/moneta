import type { MaybeRefOrGetter } from 'vue';
import type { HomeChartsFilters } from '@/composables/use-home-charts-filters';
import type { TransactionCategory } from '@/domain/transactions';
import { computed, toValue } from 'vue';
import { useTransactionsInIssuedRangeQuery } from '@/composables/use-transactions-in-issued-range-query';
import {
  aggregateCategorySpend,
  UNCATEGORIZED_CATEGORY_FILTER,
} from '@/domain/transactions';
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

  const filteredTransactions = computed(() => {
    const items = query.data.value ?? [];
    const category = resolvedFilters.value.category;

    if (!category) {
      return items;
    }

    if (category === UNCATEGORIZED_CATEGORY_FILTER) {
      return items.filter((transaction) => transaction.category === null);
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
      net: income - expense - investment,
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
