const dateOnlyFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
});

export function formatDateOnly(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return dateOnlyFormatter.format(new Date(year, month - 1, day));
}
