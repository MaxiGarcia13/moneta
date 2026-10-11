import type { TransactionFormInput } from '@/domain/transactions';
import { requireUserId } from '@/services/transactions/require-user-id';
import { supabase } from '@/supabase/client';

export async function updateTransaction(
  id: number,
  input: TransactionFormInput,
) {
  const userId = requireUserId();

  const { error } = await supabase
    .from('transactions')
    .update(input)
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    throw error;
  }
}
