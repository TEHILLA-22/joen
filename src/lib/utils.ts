// src/lib/utils.ts

type DecimalLike = { toNumber(): number };

export function formatCurrency(
  value?: number | DecimalLike | null,
  currency: string = 'USD'
): string {
  const amount =
    value && typeof value === 'object' && 'toNumber' in value
      ? value.toNumber()
      : value ?? 0;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(
  date: Date | string,
  format: 'date' | 'time' | 'datetime' = 'date'
): string {
  const d = new Date(date);

  if (format === 'date') {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  if (format === 'time') {
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
