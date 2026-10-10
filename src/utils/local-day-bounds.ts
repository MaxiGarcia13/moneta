export function startOfLocalDayIso(issuedAt: string) {
  const date = new Date(issuedAt);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
}

export function endOfLocalDayIso(issuedAt: string) {
  const date = new Date(issuedAt);
  date.setHours(23, 59, 59, 999);
  return date.toISOString();
}
