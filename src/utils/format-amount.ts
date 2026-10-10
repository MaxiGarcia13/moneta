const amountFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'EUR',
});

export function formatAmount(amount: number) {
  return amountFormatter.format(amount);
}
