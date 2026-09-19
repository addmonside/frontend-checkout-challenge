import type { QueryClient } from '@tanstack/react-query';
import { getGetQuoteQueryKey } from '@/shared/api';
import type { GetQuote200 } from '@/shared/api/gen/model';

export function cacheCreatedQuote(
  queryClient: QueryClient,
  { quoteId, quote }: { quoteId: string; quote: GetQuote200 },
) {
  queryClient.setQueryData(getGetQuoteQueryKey(quoteId), quote);
}
