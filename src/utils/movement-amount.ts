import { isMovementDateToken } from '@/utils/movement-date';
import { parseDotDecimalAmount } from '@/utils/parse-dot-decimal-amount';
import { parseSpanishAmount } from '@/utils/parse-spanish-amount';

const DOT_AMOUNT_PATTERN = /^-?\d+(?:\.\d+)?$/;
const SPANISH_AMOUNT_PATTERN = /^-?\d{1,3}(?:\.\d{3})*,\d+(?:\s*EUR)?$/i;

function stripAmountCurrency(value: string) {
  return value.replace(/\s*EUR$/i, '').trim();
}

export function isMovementAmountToken(value: string) {
  if (isMovementDateToken(value)) {
    return false;
  }

  const amount = stripAmountCurrency(value);

  return DOT_AMOUNT_PATTERN.test(amount) || SPANISH_AMOUNT_PATTERN.test(amount);
}

export function parseMovementAmount(value: string) {
  const amount = stripAmountCurrency(value);

  if (amount.includes(',')) {
    return parseSpanishAmount(amount);
  }

  return parseDotDecimalAmount(amount);
}
