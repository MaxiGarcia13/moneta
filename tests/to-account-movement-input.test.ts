import { describe, expect, it } from 'vitest';
import { toAccountMovementInput } from '@/domain/transactions/to-account-movement-input';

const ISSUED_AT = '2026-10-14T00:00:00.000Z';

describe('toAccountMovementInput', () => {
  it('uses the absolute amount and expense type for negative values', () => {
    const result = toAccountMovementInput(
      'Compra Mercadona',
      -12.5,
      ISSUED_AT,
    );

    expect(result.amount).toBe(12.5);
    expect(result.type).toBe('expense');
    expect(result.issued_at).toBe(ISSUED_AT);
  });

  it('uses income type for positive amounts', () => {
    expect(toAccountMovementInput('Transferencia', 100, ISSUED_AT).type)
      .toBe('income');
  });

  it('redacts card numbers and keeps casing in title and description', () => {
    const result = toAccountMovementInput(
      'COMPRA TARJETA : 5154321012345678 MERCADONA',
      -7.16,
      ISSUED_AT,
    );

    expect(result.title).toBe('COMPRA TARJETA : **** MERCADONA');
    expect(result.description).toBe(result.title);
  });

  it('infers groceries category for mercadona', () => {
    expect(toAccountMovementInput('Compra Mercadona', -10, ISSUED_AT).category)
      .toBe('groceries');
  });
});
