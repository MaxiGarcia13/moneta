import type { TransactionType } from './transactions';

const INVESTMENT_PATTERNS = [
  /invertimos\s*por\s*ti/i,
  /garcia\s+mortigliengo\s+maximiliano\s+daniel/i,
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
