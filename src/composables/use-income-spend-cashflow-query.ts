import type { MaybeRefOrGetter } from 'vue';
import type { IncomeSpendFilters } from '@/composables/use-income-spend-filters';
import { useQuery } from '@tanstack/vue-query';
import { computed, toValue } from 'vue';
import { TRANSACTIONS_QUERY_KEY } from '@/composables/use-transactions-query';
import { listTransactionsInIssuedRange } from '@/services/transactions';
import { aggregateMonthlyCashflow } from '@/utils/aggregate-monthly-cashflow';
import {
  endOfLocalDayIso,
  startOfLocalDayIso,
} from '@/utils/local-day-bounds';
import { getDefaultHomeDateRange } from '@/utils/month-bounds';

export const INCOME_SPEND_CASHFLOW_QUERY_KEY = 'income-spend-cashflow' as const;

function resolveDateRange(filters: IncomeSpendFilters) {
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

export function useIncomeSpendCashflowQuery(
  filters: MaybeRefOrGetter<IncomeSpendFilters>,
) {
  const dateRange = computed(() => resolveDateRange(toValue(filters)));

  const queryKeyRange = computed(() => ({
    issuedFrom: dateRange.value.issuedFromIso,
    issuedTo: dateRange.value.issuedToIso,
  }));

  const query = useQuery({
    queryKey: [
      TRANSACTIONS_QUERY_KEY,
      INCOME_SPEND_CASHFLOW_QUERY_KEY,
      queryKeyRange,
    ],
    queryFn: () => listTransactionsInIssuedRange(
      queryKeyRange.value.issuedFrom,
      queryKeyRange.value.issuedTo,
    ),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 30,
  });

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
