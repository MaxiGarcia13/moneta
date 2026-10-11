import type { TransactionFormInput } from '@/domain/transactions';
import { createTransactions } from '@/services/transactions/create-transactions';

export async function createTransaction(
  input: TransactionFormInput,
) {
  await createTransactions([input]);
}
