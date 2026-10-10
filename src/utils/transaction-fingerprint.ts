export interface TransactionFingerprintInput {
  issued_at: string;
  title: string;
  amount: number;
  type: string;
}

function issuedDateKey(issuedAt: string) {
  const date = new Date(issuedAt);

  if (Number.isNaN(date.getTime())) {
    return issuedAt;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function normalizeTitle(title: string) {
  return title.replace(/\s+/g, ' ').trim();
}

function normalizeAmount(amount: number) {
  return Number(amount).toFixed(2);
}

export function transactionFingerprint(input: TransactionFingerprintInput) {
  return [
    issuedDateKey(input.issued_at),
    normalizeTitle(input.title),
    normalizeAmount(input.amount),
    input.type,
  ].join('|');
}

export function markDuplicateMovements(
  movements: TransactionFingerprintInput[],
  existing: TransactionFingerprintInput[],
): boolean[] {
  const available = new Map<string, number>();

  for (const transaction of existing) {
    const key = transactionFingerprint(transaction);
    available.set(key, (available.get(key) ?? 0) + 1);
  }

  return movements.map((movement) => {
    const key = transactionFingerprint(movement);
    const count = available.get(key) ?? 0;

    if (count > 0) {
      available.set(key, count - 1);
      return true;
    }

    return false;
  });
}
