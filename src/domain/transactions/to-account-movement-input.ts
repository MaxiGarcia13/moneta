import type { TransactionFormInput } from './transaction-form';
import { inferTransactionCategory } from './infer-transaction-category';
import { inferTransactionType } from './infer-transaction-type';

export function toAccountMovementInput(
  concept: string,
  signedAmount: number,
  issuedAt: string,
): TransactionFormInput {
  return {
    title: concept,
    description: concept,
    amount: Math.abs(signedAmount),
    type: inferTransactionType(concept, signedAmount),
    category: inferTransactionCategory(concept),
    issued_at: issuedAt,
  };
}
