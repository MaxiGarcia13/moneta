import type { TransactionFormInput } from './transaction-form';
import type { PdfTextItem } from '@/utils/extract-pdf-text-items';
import {
  isMovementAmountToken,
  parseMovementAmount,
} from '@/utils/movement-amount';
import {
  isMovementDateToken,
  parseMovementDate,
} from '@/utils/movement-date';
import { normalizeWhitespace } from '@/utils/normalize-whitespace';
import { toAccountMovementInput } from './to-account-movement-input';

const CONCEPT_Y_TOLERANCE = 12;

interface PdfTextRow {
  page: number;
  y: number;
  items: PdfTextItem[];
}

function foldText(value: string) {
  return normalizeWhitespace(value)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}

function groupItemsIntoRows(items: PdfTextItem[]): PdfTextRow[] {
  const rowsByKey = new Map<string, PdfTextRow>();

  for (const item of items) {
    const key = `${item.page}:${Math.round(item.y)}`;
    const existing = rowsByKey.get(key);

    if (existing) {
      existing.items.push(item);
      continue;
    }

    rowsByKey.set(key, {
      page: item.page,
      y: item.y,
      items: [item],
    });
  }

  return Array.from(rowsByKey.values())
    .map((row) => ({
      ...row,
      items: row.items
        .map((item) => ({ ...item, str: normalizeWhitespace(item.str) }))
        .filter((item) => item.str.length > 0)
        .toSorted((left, right) => left.x - right.x),
    }))
    .filter((row) => row.items.length > 0)
    .toSorted((left, right) =>
      left.page - right.page || right.y - left.y);
}

function rowTexts(row: PdfTextRow) {
  return row.items.map((item) => item.str);
}

function isHeaderRow(row: PdfTextRow) {
  const labels = rowTexts(row).map(foldText);

  return labels.includes('operacion')
    && labels.includes('concepto')
    && labels.includes('importe');
}

function isSkippedRow(row: PdfTextRow) {
  const folded = foldText(rowTexts(row).join(' '));

  return folded === 'fecha'
    || folded.startsWith('lista de movimientos')
    || folded.startsWith('pagina:')
    || folded.startsWith('open bank')
    || folded.startsWith('openbank');
}

function isValueRow(row: PdfTextRow) {
  const dates = row.items.filter((item) => isMovementDateToken(item.str));
  const amounts = row.items.filter((item) => isMovementAmountToken(item.str));

  return dates.length >= 2 && amounts.length >= 2;
}

function conceptFromNearbyRows(
  valueRow: PdfTextRow,
  rows: PdfTextRow[],
) {
  return rows
    .filter((row) =>
      row.page === valueRow.page
      && row !== valueRow
      && Math.abs(row.y - valueRow.y) <= CONCEPT_Y_TOLERANCE
      && !isValueRow(row)
      && !isHeaderRow(row)
      && !isSkippedRow(row))
    .toSorted((left, right) => right.y - left.y)
    .flatMap((row) => rowTexts(row))
    .join(' ');
}

function parseValueRow(
  row: PdfTextRow,
  rows: PdfTextRow[],
): TransactionFormInput | null {
  const dates = row.items
    .filter((item) => isMovementDateToken(item.str))
    .toSorted((left, right) => left.x - right.x);
  const amounts = row.items
    .filter((item) => isMovementAmountToken(item.str))
    .toSorted((left, right) => left.x - right.x);

  const sameLineConcept = row.items
    .filter((item) =>
      !isMovementDateToken(item.str) && !isMovementAmountToken(item.str))
    .map((item) => item.str)
    .join(' ');

  const concept = normalizeWhitespace(
    `${conceptFromNearbyRows(row, rows)} ${sameLineConcept}`,
  );

  if (!concept) {
    return null;
  }

  const operationDate = dates[0]?.str;
  const amountText = amounts.at(-2)?.str;

  if (!operationDate || !amountText) {
    return null;
  }

  return toAccountMovementInput(
    concept,
    parseMovementAmount(amountText),
    parseMovementDate(operationDate),
  );
}

export function parseAccountMovementsPdf(
  items: PdfTextItem[],
): TransactionFormInput[] {
  const rows = groupItemsIntoRows(items);
  let hasHeader = false;
  const movements: TransactionFormInput[] = [];

  for (const row of rows) {
    if (isHeaderRow(row)) {
      hasHeader = true;
      continue;
    }

    if (!hasHeader || isSkippedRow(row) || !isValueRow(row)) {
      continue;
    }

    const movement = parseValueRow(row, rows);

    if (movement) {
      movements.push(movement);
    }
  }

  if (!hasHeader) {
    throw new Error('Could not find the movements table header');
  }

  if (movements.length === 0) {
    throw new Error('No movements found in the file');
  }

  return movements;
}
