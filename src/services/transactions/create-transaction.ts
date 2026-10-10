import type { CreateTransactionInput } from '@/domain/transactions';
import { createTransactions } from '@/services/transactions/create-transactions';

export async function createTransaction(
  input: CreateTransactionInput,
) {
  await createTransactions([input]);
}
