import { toApiError, useGetPayment } from '@/shared/api';
import { GetPayment200Data, GetPayment200DataStatus } from '@/shared/api/gen/model';

export type PaymentStatus = (typeof GetPayment200DataStatus)[keyof typeof GetPayment200DataStatus];

const FINAL_STATUSES: ReadonlySet<string> = new Set(['succeeded', 'failed', 'cancelled']);

export function isPaymentFinal(status: PaymentStatus | undefined): boolean {
  return !!status && FINAL_STATUSES.has(status);
}

/**
 * Опрашивает попытку оплаты, пока статус не финальный.
 * `retryAfterMs` — пауза из заголовка Retry-After (или запасное значение).
 * Опрос автоматически прекращается при размонтировании и при финальном статусе.
 */
export function usePaymentStatus(paymentId: string | undefined, retryAfterMs: number) {
  const { data, isPending, error } = useGetPayment(paymentId ?? '', {
    query: {
      enabled: !!paymentId,
      refetchInterval: (query) =>
        isPaymentFinal(extractStatus(query.state.data)) ? false : retryAfterMs,
    },
  });

  return { payment: extractPayment(data), isPending, error: toApiError(error) };
}

function extractPayment(data: unknown): GetPayment200Data | undefined {
  if (data && typeof data === 'object' && 'data' in data) {
    const inner = (data as { data: unknown }).data;
    if (inner && typeof inner === 'object' && 'status' in inner) {
      return inner as GetPayment200Data;
    }
  }
  return undefined;
}

function extractStatus(data: unknown): PaymentStatus | undefined {
  return extractPayment(data)?.status;
}
