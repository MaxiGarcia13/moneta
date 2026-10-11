import type { UNCATEGORIZED_CATEGORY_FILTER } from './constants';
import type { TransactionCategory } from './transactions';

export interface TransactionFilters {
  title: string;
  category: string;
  type: string;
  issuedFrom: string;
  issuedTo: string;
}

export type CategoryFilterValue
  = | TransactionCategory
    | typeof UNCATEGORIZED_CATEGORY_FILTER;
