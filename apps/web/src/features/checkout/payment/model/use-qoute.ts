import { useGetQuote } from '@/shared/api';
import { GetQuote200Data } from '@/shared/api/gen/model';

export const useQuote = (quoteId: string) => {
  const { data, isPending, error } = useGetQuote(quoteId);

  const quote =
    typeof data?.data === 'object' &&
    'data' in data.data &&
    'items' in data.data?.data &&
    'delivery' in data.data?.data
      ? (data.data?.data as GetQuote200Data)
      : undefined;

  return { quote, isPending, error };
};
