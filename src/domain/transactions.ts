import type { Database, Tables, TablesInsert } from '@/supabase/database.types';
import { Constants } from '@/supabase/database.types';

export type Transaction = Tables<'transactions'>;
export type TransactionInsert = TablesInsert<'transactions'>;
export type TransactionType = Database['public']['Enums']['type'];
export type TransactionCategory = Database['public']['Enums']['category'];

export type CreateTransactionInput = Pick<
  TransactionInsert,
  'title' | 'amount' | 'type' | 'category' | 'description' | 'issued_at'
>;

export interface ListTransactionsParams {
  limit: number;
  offset: number;
  title?: string;
  category?: TransactionCategory | null;
  type?: TransactionType | null;
  issuedFrom?: string | null;
  issuedTo?: string | null;
}

export interface ListTransactionsResult {
  items: Transaction[];
  total: number;
}

export const TRANSACTION_TYPES = Constants.public.Enums.type;
export const TRANSACTION_CATEGORIES = Constants.public.Enums.category;
