import { useMemo } from 'react';
import { toApiError, useCreateQuote } from '@/shared/api';
import { CreateQuote201Data, CreateQuoteBodyDelivery } from '@/shared/api/gen/model';

export function useCreateCheckout(
  cartVersion: number,
  onSuccess?: (data: CreateQuote201Data) => void,
) {
  const { mutate, isPending, error } = useCreateQuote({
    mutation: {
      onSuccess: (res) => onSuccess?.(res.data as unknown as CreateQuote201Data),
    },
  });

  const fieldErrors = useMemo(() => toApiError(error)?.toFieldErrorMap() ?? {}, [error]);

  const createCheckout = (delivery: CreateQuoteBodyDelivery) => {
    mutate({ data: { cartVersion, delivery } });
  };

  return { createCheckout, isPending, fieldErrors };
}
