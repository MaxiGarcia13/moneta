import type { TransactionInsert } from './transactions';

export type CreateTransactionInput = Pick<
  TransactionInsert,
  'title' | 'amount' | 'type' | 'category' | 'description' | 'issued_at'
>;
