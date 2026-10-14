import type { TransactionFormInput } from './transaction-form';
import { normalizeMovementTitle } from '@/utils/normalize-movement-title';
import { inferTransactionCategory } from './infer-transaction-category';
import { inferTransactionType } from './infer-transaction-type';

export function toAccountMovementInput(
  concept: string,
  signedAmount: number,
  issuedAt: string,
): TransactionFormInput {
  const title = normalizeMovementTitle(concept);

  return {
    title,
    description: title,
    amount: Math.abs(signedAmount),
    type: inferTransactionType(title, signedAmount),
    category: inferTransactionCategory(title),
    issued_at: issuedAt,
  };
}
