const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function toLocalDate(value: string) {
  if (DATE_ONLY_PATTERN.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  return new Date(value);
}

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
