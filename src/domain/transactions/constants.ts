import { Constants } from '@/supabase/database.types';

export const UNCATEGORIZED_CATEGORY_FILTER = 'uncategorized' as const;
export const TRANSACTION_TYPES = Constants.public.Enums.type;
export const TRANSACTION_CATEGORIES = Constants.public.Enums.category;
