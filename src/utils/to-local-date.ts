const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function toLocalDate(value: string) {
  if (DATE_ONLY_PATTERN.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  return new Date(value);
}
