import type { MaybeRefOrGetter } from 'vue';
import type { IssuedDateRange } from '@/utils/resolve-issued-date-range';
import { useQuery } from '@tanstack/vue-query';
import { computed, toValue } from 'vue';
import { TRANSACTIONS_QUERY_KEY } from '@/composables/use-transactions-query';
import { listTransactionsInIssuedRange } from '@/services/transactions';

const TRANSACTIONS_STALE_TIME_MS = 1000 * 60 * 30;

export function useTransactionsInIssuedRangeQuery(
  scopeKey: string,
  dateRange: MaybeRefOrGetter<IssuedDateRange>,
) {
  const queryKeyRange = computed(() => {
    const range = toValue(dateRange);

    return {
      issuedFrom: range.issuedFromIso,
      issuedTo: range.issuedToIso,
    };
  });

  return useQuery({
    queryKey: [
      TRANSACTIONS_QUERY_KEY,
      scopeKey,
      queryKeyRange,
    ],
    queryFn: () => listTransactionsInIssuedRange(
      queryKeyRange.value.issuedFrom,
      queryKeyRange.value.issuedTo,
    ),
    refetchOnWindowFocus: true,
    staleTime: TRANSACTIONS_STALE_TIME_MS,
  });
}
