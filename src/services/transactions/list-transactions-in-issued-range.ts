import type { Transaction } from '@/domain/transactions';
import { requireUserId } from '@/services/transactions/require-user-id';
import { supabase } from '@/supabase/client';

const PAGE_SIZE = 1000;

export async function listTransactionsInIssuedRange(
  issuedFrom: string,
  issuedTo: string,
): Promise<Pick<Transaction, 'issued_at' | 'title' | 'amount' | 'type'>[]> {
  requireUserId();

  const items: Pick<Transaction, 'issued_at' | 'title' | 'amount' | 'type'>[] = [];
  let offset = 0;

  while (true) {
    const { data, error } = await supabase
      .from('transactions')
      .select('issued_at, title, amount, type')
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
