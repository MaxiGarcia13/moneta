import { formatEnumLabel } from '@/utils/format-enum-label';
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
  UNCATEGORIZED_CATEGORY_FILTER,
} from './constants';

export const TRANSACTION_TYPE_OPTIONS = TRANSACTION_TYPES.map((type) => ({
  value: type,
  label: formatEnumLabel(type),
}));

export const TRANSACTION_CATEGORY_OPTIONS = TRANSACTION_CATEGORIES.map(
  (category) => ({
    value: category,
    label: formatEnumLabel(category),
  }),
);

export const TRANSACTION_CATEGORY_FILTER_OPTIONS = [
  {
    value: UNCATEGORIZED_CATEGORY_FILTER,
    label: 'Uncategorized',
  },
  ...TRANSACTION_CATEGORY_OPTIONS,
];
