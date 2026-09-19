import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toApiError, useCreateQuote } from '@/shared/api';
import { CreateQuote201Data, CreateQuoteBodyDelivery, GetQuote200 } from '@/shared/api/gen/model';
import { cacheCreatedQuote } from '../../common/quote-cache';

export function useCreateCheckout(
  cartVersion: number,
  onSuccess?: (data: CreateQuote201Data) => void,
) {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useCreateQuote({
    mutation: {
      onSuccess: (res) => {
        const quote = res.data as unknown as CreateQuote201Data;
        cacheCreatedQuote(queryClient, {
          quoteId: quote.id,
          quote: res as unknown as GetQuote200,
        });
        onSuccess?.(quote);
      },
    },
  });

  const fieldErrors = useMemo(() => toApiError(error)?.toFieldErrorMap() ?? {}, [error]);

  const createCheckout = (delivery: CreateQuoteBodyDelivery) => {
    mutate({ data: { cartVersion, delivery } });
  };

  return { createCheckout, isPending, fieldErrors };
}
