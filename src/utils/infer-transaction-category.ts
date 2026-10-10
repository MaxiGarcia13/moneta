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
    category: 'housing',
    patterns: [
      /jazztel/i,
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
      /carrefour/i,
    ],
  },
  {
    category: 'car',
    patterns: [
      /balenoil/i,
      /feu\s*vert/i,
    ],
  },
  {
    category: 'leisure',
    patterns: [
      /\bbar\b/i,
      /glovo/i,
      /\bg6\b/i,
      /\bregma\b/i,
      /camping/i,
      /gallofa/i,
    ],
  },
  {
    category: 'health_fitness',
    patterns: [
      /saravia\s*bartomioli/i,
    ],
  },
  {
    category: 'shopping',
    patterns: [
      /decathlon/i,
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
