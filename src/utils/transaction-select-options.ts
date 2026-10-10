import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from '@/domain/transactions';
import { formatEnumLabel } from '@/utils/format-enum-label';

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
