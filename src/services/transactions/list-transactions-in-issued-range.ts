import type { Transaction } from '@/domain/transactions';
import { requireUserId } from '@/services/transactions/require-user-id';
import { supabase } from '@/supabase/client';

const PAGE_SIZE = 1000;

type TransactionInIssuedRange = Pick<
  Transaction,
  'issued_at' | 'title' | 'amount' | 'type' | 'category'
>;

export async function listTransactionsInIssuedRange(
  issuedFrom: string,
  issuedTo: string,
): Promise<TransactionInIssuedRange[]> {
  requireUserId();

  const items: TransactionInIssuedRange[] = [];
  let offset = 0;

  while (true) {
    const { data, error } = await supabase
      .from('transactions')
      .select('issued_at, title, amount, type, category')
      .gte('issued_at', issuedFrom)
      .lte('issued_at', issuedTo)
      .order('issued_at', { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1);

    if (error) {
      throw error;
    }

    if (!data?.length) {
      break;
    }

    items.push(...data);

    if (data.length < PAGE_SIZE) {
      break;
    }

    offset += PAGE_SIZE;
  }

  return items;
}
