import type { TransactionType } from '@/domain/transactions';

export function transactionTypeAmountClass(
  type: TransactionType | string,
): string {
  if (type === 'income') {
    return 'text-accent';
  }

  if (type === 'investment') {
    return 'text-investment';
  }

  return 'text-danger';
}
