import type { TransactionCategory } from '@/domain/transactions';

const CATEGORY_RULES: Array<{
  category: TransactionCategory;
  patterns: RegExp[];
}> = [
  {
    category: 'subscriptions',
    patterns: [
      /amazon\s*prime/i,
      /disney/i,
      /apple\.com\/bill/i,
    ],
  },
  {
    category: 'groceries',
    patterns: [
      /\blupa\b/i,
      /mercadona/i,
      /\blidl\b/i,
      /\bbm\b/i,
      /coviran/i,
    ],
  },
];

export function inferTransactionCategory(
  concept: string,
): TransactionCategory | null {
  for (const rule of CATEGORY_RULES) {
    if (rule.patterns.some((pattern) => pattern.test(concept))) {
      return rule.category;
    }
  }

  return null;
}
