import { toLocalDate } from '@/utils/to-local-date';

const dateOnlyFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
});

export function formatDateOnly(value: string) {
  return dateOnlyFormatter.format(toLocalDate(value));
}
