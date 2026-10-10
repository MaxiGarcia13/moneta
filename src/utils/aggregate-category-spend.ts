import type { TransactionCategory, TransactionType } from '@/domain/transactions';
import { formatEnumLabel } from '@/utils/format-enum-label';

const UNCATEGORIZED_LABEL = 'Uncategorized';

export interface CategorySpendTransaction {
  amount: number;
  type: TransactionType;
  category: TransactionCategory | null;
}

export interface CategorySpend {
  labels: string[];
  values: number[];
}

export function aggregateCategorySpend(
  transactions: CategorySpendTransaction[],
): CategorySpend {
  const totals = new Map<string, number>();

  for (const transaction of transactions) {
    if (transaction.type !== 'expense') {
      continue;
    }

    const label = transaction.category
      ? formatEnumLabel(transaction.category)
      : UNCATEGORIZED_LABEL;

    totals.set(label, (totals.get(label) ?? 0) + transaction.amount);
  }

  const sorted = [...totals.entries()].sort((left, right) => right[1] - left[1]);

  return {
    labels: sorted.map(([label]) => label),
    values: sorted.map(([, value]) => value),
  };
}
