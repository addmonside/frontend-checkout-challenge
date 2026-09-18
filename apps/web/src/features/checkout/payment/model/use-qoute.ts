import { toApiError, useGetQuote } from '@/shared/api';
import { GetQuote200Data } from '@/shared/api/gen/model';

export const useQuote = (quoteId: string) => {
  const { data, isPending, error } = useGetQuote(quoteId, {
    query: { meta: { suppressErrorToast: true } },
  });

  const quote =
    typeof data?.data === 'object' && 'items' in data.data && 'delivery' in data.data
      ? (data.data as unknown as GetQuote200Data)
      : undefined;

  return { quote, isPending, error: toApiError(error) };
};
