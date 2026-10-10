import type { TransactionType } from '@/domain/transactions';
import {
  formatMonthLabel,
  listMonthKeysInRange,
  toMonthKey,
} from '@/utils/month-bounds';

export interface CashflowTransaction {
  issued_at: string;
  amount: number;
  type: TransactionType;
}

export interface MonthlyCashflow {
  months: string[];
  income: number[];
  expense: number[];
  remaining: number[];
}

export function aggregateMonthlyCashflow(
  transactions: CashflowTransaction[],
  issuedFrom: string,
  issuedTo: string,
): MonthlyCashflow {
  const monthKeys = listMonthKeysInRange(issuedFrom, issuedTo);
  const incomeByMonth = new Map(monthKeys.map((key) => [key, 0]));
  const expenseByMonth = new Map(monthKeys.map((key) => [key, 0]));

  for (const transaction of transactions) {
    const monthKey = toMonthKey(transaction.issued_at);

    if (!incomeByMonth.has(monthKey)) {
      continue;
    }

    if (transaction.type === 'income') {
      incomeByMonth.set(
        monthKey,
        (incomeByMonth.get(monthKey) ?? 0) + transaction.amount,
      );
      continue;
    }

    expenseByMonth.set(
      monthKey,
      (expenseByMonth.get(monthKey) ?? 0) + transaction.amount,
    );
  }

  const income = monthKeys.map((key) => incomeByMonth.get(key) ?? 0);
  const expense = monthKeys.map((key) => expenseByMonth.get(key) ?? 0);
  const remaining = monthKeys.map((_, index) =>
    Math.max(0, income[index] - expense[index]),
  );

  return {
    months: monthKeys.map(formatMonthLabel),
    income,
    expense,
    remaining,
  };
}
