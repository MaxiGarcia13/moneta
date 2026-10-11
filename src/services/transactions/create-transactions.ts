import type { TransactionFormInput } from '@/domain/transactions';
import { requireUserId } from '@/services/transactions/require-user-id';
import { supabase } from '@/supabase/client';

export async function createTransactions(
  inputs: TransactionFormInput[],
) {
  if (inputs.length === 0) {
    return;
  }

  const userId = requireUserId();

  const { error } = await supabase
    .from('transactions')
    .insert(inputs.map((input) => ({
      ...input,
      user_id: userId,
    })));

  if (error) {
    throw error;
  }
}
