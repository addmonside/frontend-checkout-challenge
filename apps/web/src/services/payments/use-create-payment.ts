import { useQueryClient } from '@tanstack/react-query';
import {
  createPayment as createPaymentApi,
  toApiError,
  useCreatePayment as useCreatePaymentApi,
} from '@/shared/api';
import { CreatePayment201Data } from '@/shared/api/gen/model';
import { useIdempotencyKey } from '@/shared/lib';
import { invalidateOrderPayments } from './payment-cache';

export function useCreatePayment(orderId: string) {
  const queryClient = useQueryClient();
  const { getKey, renewKey } = useIdempotencyKey();

  const {
    mutateAsync,
    isPending,
    error: rawError,
  } = useCreatePaymentApi({
    mutation: {
      meta: { suppressErrorToast: true },
      mutationFn: (variables) =>
        createPaymentApi(variables.orderId, variables.data, {
          headers: { 'Idempotency-Key': getKey() },
        }),
      onSuccess: () => invalidateOrderPayments(queryClient, orderId),
      onError: () => invalidateOrderPayments(queryClient, orderId),
    },
  });

  const createPayment = async () => {
    const res = await mutateAsync({ orderId, data: {} });
    return res.data as unknown as CreatePayment201Data;
  };

  return { createPayment, renewKey, isPending, error: toApiError(rawError) };
}
