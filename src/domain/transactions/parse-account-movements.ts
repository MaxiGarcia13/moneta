import type { TransactionFormInput } from './transaction-form';
import { normalizeWhitespace } from '@/utils/normalize-whitespace';
import { parseSpanishAmount } from '@/utils/parse-spanish-amount';
import { parseSpanishDateToIso } from '@/utils/parse-spanish-date';
import { toAccountMovementInput } from './to-account-movement-input';

const HEADER_FECHA_OPERACION = 'fecha operacion';
const HEADER_CONCEPTO = 'concepto';
const HEADER_IMPORTE = 'importe';

function foldText(value: string) {
  return normalizeWhitespace(value)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}

function cellText(cell: Element | undefined) {
  return normalizeWhitespace(cell?.textContent ?? '');
}

function findHeaderIndexes(headerCells: Element[]) {
  const labels = headerCells.map((cell) => foldText(cellText(cell)));

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
): TransactionFormInput | null {
  const operationDate = cellText(cells[indexes.operationDate]);
  const concept = cellText(cells[indexes.concept]);
  const amountText = cellText(cells[indexes.amount]);

  if (!operationDate || !concept || !amountText) {
    return null;
  }

  return toAccountMovementInput(
    concept,
    parseSpanishAmount(amountText),
    parseSpanishDateToIso(operationDate),
  );
}

export function parseAccountMovements(html: string): TransactionFormInput[] {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const rows = Array.from(document.querySelectorAll('tr'));

  let indexes: ReturnType<typeof findHeaderIndexes> | null = null;
  const movements: TransactionFormInput[] = [];

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
