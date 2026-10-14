import { describe, expect, it } from 'vitest';
import { markDuplicateMovements } from '@/domain/transactions/transaction-fingerprint';

const ISSUED_AT = '2026-10-14T00:00:00.000Z';

function movement(
  overrides: Partial<{
    issued_at: string;
    title: string;
    amount: number;
    type: string;
  }> = {},
) {
  return {
    issued_at: ISSUED_AT,
    title: 'Compra Mercadona',
    amount: 12.5,
    type: 'expense',
    ...overrides,
  };
}

describe('markDuplicateMovements', () => {
  it('marks an exact match as duplicate', () => {
    expect(markDuplicateMovements(
      [movement()],
      [movement()],
    )).toEqual([true]);
  });

  it('matches titles that differ only by casing or accents', () => {
    expect(markDuplicateMovements(
      [movement({ title: 'Compra Operación' })],
      [movement({ title: 'compra operacion' })],
    )).toEqual([true]);
  });

  it('matches titles with different card number forms', () => {
    expect(markDuplicateMovements(
      [movement({ title: 'COMPRA TARJETA : 5154321012345678 MERCADONA' })],
      [movement({ title: 'COMPRA TARJETA : ...8001 MERCADONA' })],
    )).toEqual([true]);
  });

  it('matches titles with different credit-card asterisk masks', () => {
    expect(markDuplicateMovements(
      [movement({ title: 'COMPRA TARJETA DE CREDITO ************* MERCADONA' })],
      [movement({ title: 'COMPRA TARJETA DE CRÉDITO **** MERCADONA' })],
    )).toEqual([true]);
  });

  it('does not match when amount or date differs', () => {
    expect(markDuplicateMovements(
      [
        movement({ amount: 12.5 }),
        movement({ issued_at: '2026-10-15T00:00:00.000Z' }),
      ],
      [movement({ amount: 99, issued_at: ISSUED_AT })],
    )).toEqual([false, false]);
  });

  it('consumes existing duplicates one-by-one', () => {
    const same = movement();

    expect(markDuplicateMovements(
      [same, same, same],
      [same, same],
    )).toEqual([true, true, false]);
  });

  it('returns false when there are no existing transactions', () => {
    expect(markDuplicateMovements([movement()], [])).toEqual([false]);
  });
});
