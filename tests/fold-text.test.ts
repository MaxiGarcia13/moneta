import { describe, expect, it } from 'vitest';
import { foldText } from '@/utils/fold-text';

describe('foldText', () => {
  it.each([
    ['Operación', 'operacion'],
    ['CRÉDITO', 'credito'],
    ['Fecha Operación', 'fecha operacion'],
    ['  Pago   Bizum  ', 'pago bizum'],
    ['OPEN BANK', 'open bank'],
  ] as const)('folds %s to %s', (input, expected) => {
    expect(foldText(input)).toBe(expected);
  });
});
