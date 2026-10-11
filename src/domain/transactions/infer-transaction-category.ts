import type { TransactionCategory } from './transactions';

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
      /parking/i,
      /aparcamientos/i,
    ],
  },
  {
    category: 'transportation',
    patterns: [
      /\btus\b/i,
      /\balsa\b/i,
      /vueling/i,
      /iberia/i,
      /intermodal/i,
    ],
  },
  {
    category: 'leisure',
    patterns: [
      /glovo/i,
      /camping/i,
      /compras\s*realizadas\s*en\s*moneda\s*no\s*euro/i,
    ],
  },
  {
    category: 'health_fitness',
    patterns: [
      /saravia\s*bartomioli/i,
      /padel\s*club/i,
      /\bg6\b/i,
      /instituto\s*municipal\s*de\s*deportes/i,
      /federacion\s*cantabra\s*de\s*padel/i,
      /royma/i,
    ],
  },
  {
    category: 'shopping',
    patterns: [
      /decathlon/i,
      /adidas/i,
      /media\s*markt/i,
      /liquidacion\s*de\s*la\s*tarjeta\s*de\s*credito/i,
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
      /\bcafe\b/i,
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
