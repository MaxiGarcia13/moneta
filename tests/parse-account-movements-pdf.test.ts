import type { PdfTextItem } from '@/utils/extract-pdf-text-items';
import { describe, expect, it } from 'vitest';
import { parseAccountMovementsPdf } from '@/domain/transactions/parse-account-movements-pdf';
import { parseMovementDate } from '@/utils/movement-date';

function item(
  str: string,
  x: number,
  y: number,
  page = 1,
): PdfTextItem {
  return { str, x, y, page };
}

function headerRow(y = 800): PdfTextItem[] {
  return [
    item('Fecha', 40, y),
    item('Operación', 100, y),
    item('Concepto', 220, y),
    item('Importe', 420, y),
  ];
}

describe('parseAccountMovementsPdf', () => {
  it('parses ISO date and dot-decimal amount rows', () => {
    const movements = parseAccountMovementsPdf([
      ...headerRow(),
      item('Lista de movimientos', 40, 780),
      item('COMPRA EN MERCADONA', 220, 690),
      item('2026-10-08', 40, 680),
      item('2026-10-08', 120, 680),
      item('-24.01', 420, 680),
      item('29259.09', 500, 680),
    ]);

    expect(movements).toHaveLength(1);
    expect(movements[0]).toMatchObject({
      amount: 24.01,
      type: 'expense',
      category: 'groceries',
      issued_at: parseMovementDate('2026-10-08'),
      title: 'COMPRA EN MERCADONA',
    });
  });

  it('parses Spanish date and EUR amount rows', () => {
    const movements = parseAccountMovementsPdf([
      ...headerRow(),
      item('Apple pay: COMPRA EN BAR MONTEVERDE', 220, 690),
      item('08/10/2026', 40, 680),
      item('08/10/2026', 120, 680),
      item('-5,00 EUR', 420, 680),
      item('29.283,10 EUR', 500, 680),
    ]);

    expect(movements).toHaveLength(1);
    expect(movements[0]).toMatchObject({
      amount: 5,
      type: 'expense',
      issued_at: parseMovementDate('08/10/2026'),
      title: 'Apple pay: COMPRA EN BAR MONTEVERDE',
    });
  });

  it('redacts card numbers found on the concept line', () => {
    const movements = parseAccountMovementsPdf([
      ...headerRow(),
      item('COMPRA TARJETA : 5154520003418001 MERCADONA', 220, 690),
      item('2026-10-08', 40, 680),
      item('2026-10-08', 120, 680),
      item('-12.03', 420, 680),
      item('100.00', 500, 680),
    ]);

    expect(movements[0]?.title).toBe(
      'COMPRA TARJETA : **** MERCADONA',
    );
  });

  it('throws when the header is missing', () => {
    expect(() => parseAccountMovementsPdf([
      item('2026-10-08', 40, 680),
      item('2026-10-08', 120, 680),
      item('-1.00', 420, 680),
      item('2.00', 500, 680),
      item('COMPRA', 220, 690),
    ])).toThrow('Could not find the movements table header');
  });

  it('throws when the header exists but no movements are found', () => {
    expect(() => parseAccountMovementsPdf([
      ...headerRow(),
      item('Página: 1', 40, 700),
    ])).toThrow('No movements found in the file');
  });
});
