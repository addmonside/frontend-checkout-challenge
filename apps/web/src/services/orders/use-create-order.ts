import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toApiError, useCreateOrder as useCreateOrderApi } from '@/shared/api';
import { CreateOrder201Data, CreateOrderBody, GetOrder200 } from '@/shared/api/gen/model';
import { cacheCreatedOrder } from './order-cache';

export function useCreateOrder(quoteId: string, onSuccess?: (data: CreateOrder201Data) => void) {
  const queryClient = useQueryClient();
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
      onSuccess: (res) => {
        const order = res.data as unknown as CreateOrder201Data;
        cacheCreatedOrder(queryClient, {
          orderId: order.id,
          quoteId,
          order: res as unknown as GetOrder200,
        });
        onSuccess?.(order);
      },
    },
    request: {
      headers: { 'Idempotency-Key': idempotencyKey },
    },
  });

  const fieldErrors = useMemo(() => toApiError(rawError)?.toFieldErrorMap() ?? {}, [rawError]);
  const createOrder = (data: CreateOrderBody) => {
    mutate({ data });
  };

  return { createOrder, isPending, error: toApiError(rawError), fieldErrors };
}
