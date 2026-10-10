import type {
  CreateTransactionInput,
  ListTransactionsParams,
  ListTransactionsResult,
} from '@/domain/transactions';
import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/supabase/client';

function requireUserId() {
  const authStore = useAuthStore();
  const userId = authStore.user?.id;

  if (!userId) {
    throw new Error('You must be signed in to manage transactions');
  }

  return userId;
}

export async function createTransaction(
  input: CreateTransactionInput,
) {
  const userId = requireUserId();

  const { error } = await supabase
    .from('transactions')
    .insert({
      ...input,
      user_id: userId,
    });

  if (error) {
    throw error;
  }
}

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
