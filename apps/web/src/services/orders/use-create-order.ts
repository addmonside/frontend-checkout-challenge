import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  createOrder as createOrderApi,
  toApiError,
  useCreateOrder as useCreateOrderApi,
} from '@/shared/api';
import { CreateOrder201Data, CreateOrderBody, GetOrder200 } from '@/shared/api/gen/model';
import { useIdempotencyKey } from '@/shared/lib';
import { cacheCreatedOrder } from './order-cache';

export function useCreateOrder(quoteId: string, onSuccess?: (data: CreateOrder201Data) => void) {
  const queryClient = useQueryClient();
  const { getKey } = useIdempotencyKey();

  const {
    mutate,
    isPending,
    error: rawError,
  } = useCreateOrderApi({
    mutation: {
      meta: { suppressErrorToast: true },
      mutationFn: (variables) =>
        createOrderApi(variables.data, {
          headers: { 'Idempotency-Key': getKey() },
        }),
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
  });

  const fieldErrors = useMemo(() => toApiError(rawError)?.toFieldErrorMap() ?? {}, [rawError]);
  const createOrder = (data: CreateOrderBody) => {
    mutate({ data });
  };

  return { createOrder, isPending, error: toApiError(rawError), fieldErrors };
}
