import { requireUserId } from '@/services/transactions/require-user-id';
import { supabase } from '@/supabase/client';

export async function deleteTransaction(id: number) {
  const userId = requireUserId();

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    throw error;
  }
}
