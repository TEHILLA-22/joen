// src/lib/utils.ts
import { Decimal } from '@prisma/client/runtime/library';

export function formatCurrency(
  value?: number | Decimal | null,
  currency: string = 'USD'
): string {
  const amount =
    value instanceof Decimal
      ? value.toNumber()
      : value ?? 0;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
