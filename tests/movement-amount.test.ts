import { describe, expect, it } from 'vitest';
import {
  isMovementAmountToken,
  parseMovementAmount,
} from '@/utils/movement-amount';

describe('isMovementAmountToken', () => {
  it.each([
    '-7.16',
    '-4,05',
    '-4,05 EUR',
    '29.116,88 EUR',
    '1234.56',
    '29116',
  ])('accepts %s', (value) => {
    expect(isMovementAmountToken(value)).toBe(true);
  });

  it.each([
    '2026-10-14',
    '14/10/2026',
    'EUR',
    'abc',
    '',
  ])('rejects %s', (value) => {
    expect(isMovementAmountToken(value)).toBe(false);
  });
});

describe('parseMovementAmount', () => {
  it.each([
    ['-7.16', -7.16],
    ['-4,05', -4.05],
    ['-4,05 EUR', -4.05],
    ['29.116,88 EUR', 29116.88],
    ['1.234,56', 1234.56],
    ['1234.56', 1234.56],
  ] as const)('parses %s to %s', (value, expected) => {
    expect(parseMovementAmount(value)).toBe(expected);
  });
});
