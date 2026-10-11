import type { TransactionInsert } from './transactions';

export type TransactionFormInput = Pick<
  TransactionInsert,
  'title' | 'amount' | 'type' | 'category' | 'description' | 'issued_at'
>;
