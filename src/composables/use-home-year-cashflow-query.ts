import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { TRANSACTIONS_QUERY_KEY } from '@/composables/use-transactions-query';
import { listTransactionsInIssuedRange } from '@/services/transactions';
import { aggregateMonthlyCashflow } from '@/utils/aggregate-monthly-cashflow';
import {
  endOfLocalDayIso,
  startOfLocalDayIso,
} from '@/utils/local-day-bounds';
import { getDefaultHomeDateRange } from '@/utils/month-bounds';

export const HOME_YEAR_CASHFLOW_QUERY_KEY = 'home-year-cashflow' as const;

export function useHomeYearCashflowQuery() {
  const dateRange = getDefaultHomeDateRange();
  const issuedFromIso = startOfLocalDayIso(dateRange.issuedFrom);
  const issuedToIso = endOfLocalDayIso(dateRange.issuedTo);

  const query = useQuery({
    queryKey: [
      TRANSACTIONS_QUERY_KEY,
      HOME_YEAR_CASHFLOW_QUERY_KEY,
      issuedFromIso,
      issuedToIso,
    ],
    queryFn: () => listTransactionsInIssuedRange(issuedFromIso, issuedToIso),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 30,
  });

  const monthlyCashflow = computed(() =>
    aggregateMonthlyCashflow(
      query.data.value ?? [],
      dateRange.issuedFrom,
      dateRange.issuedTo,
    ),
  );

  return {
    ...query,
    monthlyCashflow,
  };
}
