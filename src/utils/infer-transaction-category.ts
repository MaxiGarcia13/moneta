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
      /\baldi\b/i,
      /\bbm\b/i,
      /coviran/i,
      /carrefour/i,
      /alcampo/i,
      /supermercado/i,
    ],
  },
  {
    category: 'car',
    patterns: [
      /balenoil/i,
      /feu\s*vert/i,
      /parkia/i,
      /moeve/i,
    ],
  },
  {
    category: 'transportation',
    patterns: [
      /\btus\b/i,
      /\balsa\b/i,
      /vueling/i,
      /iberia/i,
    ],
  },
  {
    category: 'leisure',
    patterns: [
      /glovo/i,
      /camping/i,
    ],
  },
  {
    category: 'health_fitness',
    patterns: [
      /saravia\s*bartomioli/i,
      /padel\s*club/i,
      /\bg6\b/i,
      /instituto\s*municipal\s*de\s*deportes/i,
    ],
  },
  {
    category: 'shopping',
    patterns: [
      /decathlon/i,
      /adidas/i,
    ],
  },
  {
    category: 'food&drink',
    patterns: [
      /restaurante/i,
      /\bregma\b/i,
      /\bbar\b/i,
      /gallofa/i,
      /cpc\s*cant\s*sl/i,
      /passarola/i,
      /vacanze\s*romane/i,
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
