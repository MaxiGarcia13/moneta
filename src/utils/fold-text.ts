import { normalizeWhitespace } from '@/utils/normalize-whitespace';

export function foldText(value: string) {
  return normalizeWhitespace(value)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}
