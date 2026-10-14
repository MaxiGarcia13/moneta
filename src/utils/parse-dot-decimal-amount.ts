export function parseDotDecimalAmount(value: string): number {
  const amount = Number(value.trim());

  if (!Number.isFinite(amount)) {
    throw new TypeError(`Invalid amount: ${value}`);
  }

  return amount;
}
