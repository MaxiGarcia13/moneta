import { parseIsoDateOnlyToIso } from '@/utils/parse-iso-date-only';
import { parseSpanishDateToIso } from '@/utils/parse-spanish-date';

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SPANISH_DATE_PATTERN = /^\d{2}\/\d{2}\/\d{4}$/;

export function isMovementDateToken(value: string) {
  const trimmed = value.trim();

  return ISO_DATE_PATTERN.test(trimmed) || SPANISH_DATE_PATTERN.test(trimmed);
}

export function parseMovementDate(value: string) {
  const trimmed = value.trim();

  if (ISO_DATE_PATTERN.test(trimmed)) {
    return parseIsoDateOnlyToIso(trimmed);
  }

  return parseSpanishDateToIso(trimmed);
}
