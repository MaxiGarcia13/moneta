import { describe, expect, it } from 'vitest';
import { normalizeMovementTitle } from '@/utils/normalize-movement-title';

describe('normalizeMovementTitle', () => {
  it.each([
    [
      'COMPRA TARJETA : 5154321012345678 MERCADONA',
      'COMPRA TARJETA : **** MERCADONA',
    ],
    [
      'COMPRA TARJETA : ...8001 MERCADONA',
      'COMPRA TARJETA : **** MERCADONA',
    ],
    [
      'compra tarjeta:5154321012345678',
      'compra TARJETA : ****',
    ],
    [
      'COMPRA TARJETA DE CREDITO ************* MERCADONA',
      'COMPRA TARJETA DE CREDITO **** MERCADONA',
    ],
    [
      'Compra Tarjeta de Crédito **********',
      'Compra TARJETA DE CREDITO ****',
    ],
  ] as const)('masks card numbers in %s', (input, expected) => {
    expect(normalizeMovementTitle(input)).toBe(expected);
  });

  it('keeps original casing when there is no card number', () => {
    expect(normalizeMovementTitle('Pago Bizum Juan')).toBe('Pago Bizum Juan');
  });

  it('collapses whitespace', () => {
    expect(normalizeMovementTitle('  Pago   Bizum  Juan  ')).toBe(
      'Pago Bizum Juan',
    );
  });
});
