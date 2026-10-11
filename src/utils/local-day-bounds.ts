import { toLocalDate } from '@/utils/to-local-date';

export function startOfLocalDayIso(value: string) {
  const date = toLocalDate(value);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
}

export function endOfLocalDayIso(value: string) {
  const date = toLocalDate(value);
  date.setHours(23, 59, 59, 999);
  return date.toISOString();
}
