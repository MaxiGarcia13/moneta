import { describe, expect, it } from 'vitest';
import {
  isMovementDateToken,
  parseMovementDate,
} from '@/utils/movement-date';

describe('isMovementDateToken', () => {
  it.each([
    '2026-10-14',
    '14/10/2026',
    ' 14/10/2026 ',
  ])('accepts %s', (value) => {
    expect(isMovementDateToken(value)).toBe(true);
  });

  it.each([
    '14-10-2026',
    '2026/10/14',
    'abc',
    '',
  ])('rejects %s', (value) => {
    expect(isMovementDateToken(value)).toBe(false);
  });
});

describe('parseMovementDate', () => {
  it('parses ISO and Spanish dates to the same day', () => {
    expect(parseMovementDate('2026-10-14')).toBe(
      parseMovementDate('14/10/2026'),
    );
  });

  it('trims whitespace before parsing', () => {
    expect(parseMovementDate(' 2026-10-14 ')).toBe(
      parseMovementDate('2026-10-14'),
    );
  });
});
