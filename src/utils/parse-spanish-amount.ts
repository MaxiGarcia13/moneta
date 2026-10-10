export function parseSpanishAmount(value: string): number {
  const normalized = value.trim().replace(/\./g, '').replace(',', '.');
  const amount = Number(normalized);

  if (!Number.isFinite(amount)) {
    throw new TypeError(`Invalid amount: ${value}`);
  }

  return amount;
}
