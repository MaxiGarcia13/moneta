import type { MaybeRefOrGetter } from 'vue';
import type { ListTransactionsParams } from '@/domain/transactions';
import { useQuery } from '@tanstack/vue-query';
import { computed, toValue } from 'vue';
import { listTransactions } from '@/services/transactions';

export const TRANSACTIONS_QUERY_KEY = 'transactions' as const;

export function useTransactionsQuery(
  params: MaybeRefOrGetter<ListTransactionsParams>,
) {
  const resolvedParams = computed(() => toValue(params));

  return useQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY, resolvedParams],
    queryFn: () => listTransactions(resolvedParams.value),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 30,
  });
}
