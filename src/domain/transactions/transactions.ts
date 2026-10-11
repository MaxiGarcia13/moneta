import type { Database, Tables, TablesInsert } from '@/supabase/database.types';

export type Transaction = Tables<'transactions'>;
export type TransactionInsert = TablesInsert<'transactions'>;
export type TransactionType = Database['public']['Enums']['type'];
export type TransactionCategory = Database['public']['Enums']['category'];
