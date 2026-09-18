import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { toApiError, useCreateOrder as useCreateOrderApi } from '@/shared/api';
import { CreateOrderBody } from '@/shared/api/gen/model';
import { checkoutPaymentAtom } from './checkout-payment-atom';

export function useCreateOrder(quoteId: string) {
  // ! ключ генерируется один раз на хук для идемпотентности
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const idempotencyKey = useMemo(() => crypto.randomUUID(), [quoteId]);
  const {
    mutate,
    isPending,
    error: rawError,
  } = useCreateOrderApi({
    mutation: {
      meta: { suppressErrorToast: true },
    },
    request: {
      headers: { 'Idempotency-Key': idempotencyKey },
    },
  });
  const paymentMethod = useAtomValue(checkoutPaymentAtom);

  const createOrder = async (customer: CreateOrderBody['customer']) => {
    mutate({ data: { quoteId, customer, paymentMethod: paymentMethod! } });
  };

  return { createOrder, isPending, error: toApiError(rawError) };
}
