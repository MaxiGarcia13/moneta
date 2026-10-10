import type { CreateTransactionInput, Transaction } from '@/domain/transactions';
import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/supabase/client';

export async function createTransaction(
  input: CreateTransactionInput,
): Promise<Transaction> {
  const authStore = useAuthStore();
  const userId = authStore.user?.id;

  if (!userId) {
    throw new Error('You must be signed in to create a transaction');
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      ...input,
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
