import type { TransactionType } from '@/domain/transactions';

const INVESTMENT_PATTERNS = [
  /invertimos\s*por\s*ti/i,
];

export function inferTransactionType(
  concept: string,
  signedAmount: number,
): TransactionType {
  if (INVESTMENT_PATTERNS.some((pattern) => pattern.test(concept))) {
    return 'investment';
  }

  return signedAmount < 0 ? 'expense' : 'income';
}
