import { toLocalDate } from '@/utils/to-local-date';

function padMonthDay(value: number) {
  return String(value).padStart(2, '0');
}

function toDateOnlyLocal(date: Date) {
  return [
    date.getFullYear(),
    padMonthDay(date.getMonth() + 1),
    padMonthDay(date.getDate()),
  ].join('-');
}

export function toMonthKey(value: string) {
  const date = toLocalDate(value);
  return `${date.getFullYear()}-${padMonthDay(date.getMonth() + 1)}`;
}

export function formatMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split('-').map(Number);
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, month - 1, 1));
}

function getDateRangeFromMonthsAgo(monthsAgo: number, now = new Date()) {
  const issuedTo = toDateOnlyLocal(now);
  const from = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
  const issuedFrom = toDateOnlyLocal(from);

  return { issuedFrom, issuedTo };
}

export function getDefaultHomeDateRange(now = new Date()) {
  return getDateRangeFromMonthsAgo(0, now);
}

export function getDefaultIncomeSpendDateRange(now = new Date()) {
  return getDateRangeFromMonthsAgo(5, now);
}

export function listMonthKeysInRange(issuedFrom: string, issuedTo: string) {
  const start = toLocalDate(issuedFrom);
  const end = toLocalDate(issuedTo);
  let year = start.getFullYear();
  let month = start.getMonth();
  const endYear = end.getFullYear();
  const endMonth = end.getMonth();
  const months: string[] = [];

  while (year < endYear || (year === endYear && month <= endMonth)) {
    months.push(`${year}-${padMonthDay(month + 1)}`);
    month += 1;

    if (month > 11) {
      month = 0;
      year += 1;
    }
  }

  return months;
}
