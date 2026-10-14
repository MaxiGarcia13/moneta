import { normalizeWhitespace } from '@/utils/normalize-whitespace';

const CARD_NUMBER_PATTERN = /TARJETA\s*:\s*(?:\.\.\.\d{2,4}|\d{10,19})/gi;
const CARD_CREDIT_MASK_PATTERN = /TARJETA\s+DE\s+CR[EÉ]DITO\s+\*+/gi;

export function normalizeMovementTitle(title: string) {
  return normalizeWhitespace(
    title
      .replace(CARD_NUMBER_PATTERN, 'TARJETA : ****')
      .replace(CARD_CREDIT_MASK_PATTERN, 'TARJETA DE CREDITO ****'),
  );
}
