import type { Database, Tables } from '@/supabase/database.types';

export type Transaction = Tables<'transactions'>;
export type TransactionType = Database['public']['Enums']['type'];
export type TransactionCategory = Database['public']['Enums']['category'];
