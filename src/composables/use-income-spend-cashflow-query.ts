import type { MaybeRefOrGetter } from 'vue';
import type { IncomeSpendFilters } from '@/composables/use-income-spend-filters';
import { computed, toValue } from 'vue';
import { useTransactionsInIssuedRangeQuery } from '@/composables/use-transactions-in-issued-range-query';
import { aggregateMonthlyCashflow } from '@/domain/transactions';
import { getDefaultIncomeSpendDateRange } from '@/utils/month-bounds';
import { resolveIssuedDateRange } from '@/utils/resolve-issued-date-range';

const INCOME_SPEND_CASHFLOW_QUERY_KEY = 'income-spend-cashflow' as const;

export function useIncomeSpendCashflowQuery(
  filters: MaybeRefOrGetter<IncomeSpendFilters>,
) {
  const dateRange = computed(() => resolveIssuedDateRange(
    toValue(filters),
    getDefaultIncomeSpendDateRange(),
  ));

  const query = useTransactionsInIssuedRangeQuery(
    INCOME_SPEND_CASHFLOW_QUERY_KEY,
    dateRange,
  );

  const monthlyCashflow = computed(() =>
    aggregateMonthlyCashflow(
      query.data.value ?? [],
      dateRange.value.issuedFrom,
      dateRange.value.issuedTo,
    ),
  );

  return {
    ...query,
    monthlyCashflow,
  };
}
