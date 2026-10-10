import type { CreateTransactionInput } from '@/domain/transactions';
import { inferTransactionCategory } from '@/utils/infer-transaction-category';
import { parseSpanishAmount } from '@/utils/parse-spanish-amount';
import { parseSpanishDateToIso } from '@/utils/parse-spanish-date';

const HEADER_FECHA_OPERACION = 'fecha operación';
const HEADER_CONCEPTO = 'concepto';
const HEADER_IMPORTE = 'importe';

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function cellText(cell: Element | undefined) {
  return normalizeText(cell?.textContent ?? '');
}

function findHeaderIndexes(headerCells: Element[]) {
  const labels = headerCells.map((cell) => cellText(cell).toLowerCase());

  return {
    operationDate: labels.findIndex((label) => label === HEADER_FECHA_OPERACION),
    concept: labels.findIndex((label) => label === HEADER_CONCEPTO),
    amount: labels.findIndex((label) => label === HEADER_IMPORTE),
  };
}

function isHeaderRow(cells: Element[]) {
  const indexes = findHeaderIndexes(cells);
  return indexes.operationDate >= 0 && indexes.concept >= 0 && indexes.amount >= 0;
}

function parseMovementRow(
  cells: Element[],
  indexes: ReturnType<typeof findHeaderIndexes>,
): CreateTransactionInput | null {
  const operationDate = cellText(cells[indexes.operationDate]);
  const concept = cellText(cells[indexes.concept]);
  const amountText = cellText(cells[indexes.amount]);

  if (!operationDate || !concept || !amountText) {
    return null;
  }

  const signedAmount = parseSpanishAmount(amountText);

  return {
    title: concept,
    description: concept,
    amount: Math.abs(signedAmount),
    type: signedAmount < 0 ? 'expense' : 'income',
    category: inferTransactionCategory(concept),
    issued_at: parseSpanishDateToIso(operationDate),
  };
}

export function parseAccountMovements(html: string): CreateTransactionInput[] {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const rows = Array.from(document.querySelectorAll('tr'));

  let indexes: ReturnType<typeof findHeaderIndexes> | null = null;
  const movements: CreateTransactionInput[] = [];

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll('td'));

    if (cells.length === 0) {
      continue;
    }

    if (!indexes) {
      if (isHeaderRow(cells)) {
        indexes = findHeaderIndexes(cells);
      }
      continue;
    }

    const movement = parseMovementRow(cells, indexes);

    if (movement) {
      movements.push(movement);
    }
  }

  if (!indexes) {
    throw new Error('Could not find the movements table header');
  }

  if (movements.length === 0) {
    throw new Error('No movements found in the file');
  }

  return movements;
}
