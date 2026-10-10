import type {
  ListTransactionsParams,
  ListTransactionsResult,
} from '@/domain/transactions';
import { requireUserId } from '@/services/transactions/require-user-id';
import { supabase } from '@/supabase/client';

export async function listTransactions(
  params: ListTransactionsParams,
): Promise<ListTransactionsResult> {
  requireUserId();

  const title = params.title?.trim();
  const to = params.offset + params.limit - 1;

  let query = supabase
    .from('transactions')
    .select('*', { count: 'exact' })
    .order('issued_at', { ascending: false })
    .range(params.offset, to);

  if (title) {
    query = query.ilike('title', `%${title}%`);
  }

  if (params.category) {
    query = query.eq('category', params.category);
  }

  if (params.type) {
    query = query.eq('type', params.type);
  }

  if (params.issuedFrom) {
    query = query.gte('issued_at', params.issuedFrom);
  }

  if (params.issuedTo) {
    query = query.lte('issued_at', params.issuedTo);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    items: data ?? [],
    total: count ?? 0,
  };
}
