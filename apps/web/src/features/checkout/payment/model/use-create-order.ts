import { useMemo } from 'react';
import { toApiError, useCreateOrder as useCreateOrderApi } from '@/shared/api';
import { CreateOrder201Data, CreateOrderBody } from '@/shared/api/gen/model';

// todo надо ли переносить логику в заказы???

export function useCreateOrder(quoteId: string, onSuccess?: (data: CreateOrder201Data) => void) {
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
        // todo: ревалидировать корзину и quite
        onSuccess?.(res.data as unknown as CreateOrder201Data);
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
