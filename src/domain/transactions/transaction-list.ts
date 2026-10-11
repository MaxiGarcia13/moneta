import type { CategoryFilterValue } from './transaction-filters';
import type { Transaction, TransactionType } from './transactions';

export interface ListTransactionsParams {
  limit: number;
  offset: number;
  title?: string;
  category?: CategoryFilterValue | null;
  type?: TransactionType | null;
  issuedFrom?: string | null;
  issuedTo?: string | null;
}

export interface ListTransactionsResult {
  items: Transaction[];
  total: number;
}
