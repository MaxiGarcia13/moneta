export function dateTimeLocalToIso(value: string) {
  return new Date(value).toISOString();
}
