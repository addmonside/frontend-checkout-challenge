import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';
import { toApiError, useCreateOrder as useCreateOrderApi } from '@/shared/api';
import { CreateOrderBody } from '@/shared/api/gen/model';
import { checkoutPaymentAtom } from './checkout-payment-atom';

// todo надо ли переносить логику в заказы???

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
  const [attempted, setAttempted] = useState(false);

  const fieldErrors = useMemo<Record<string, string>>(() => {
    const clientErrors: Record<string, string> =
      attempted && !paymentMethod ? { paymentMethod: 'Выберите способ оплаты' } : {};
    const apiFieldErrors = toApiError(rawError)?.toFieldErrorMap() ?? {};
    return { ...clientErrors, ...apiFieldErrors };
  }, [attempted, paymentMethod, rawError]);

  const createOrder = (customer: CreateOrderBody['customer']) => {
    setAttempted(true);

    if (!paymentMethod) return;
    mutate({ data: { quoteId, customer, paymentMethod } });
  };

  return { createOrder, isPending, error: toApiError(rawError), fieldErrors };
}
