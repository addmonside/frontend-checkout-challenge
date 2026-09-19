import type { QueryClient } from '@tanstack/react-query';
import {
  getGetCartQueryKey,
  getGetCheckoutOptionsQueryKey,
  getGetOrderQueryKey,
  getGetQuoteQueryKey,
  getListOrdersQueryKey,
} from '@/shared/api';
import type { GetOrder200 } from '@/shared/api/gen/model';

export function cacheCreatedOrder(
  queryClient: QueryClient,
  { orderId, quoteId, order }: { orderId: string; quoteId: string; order: GetOrder200 },
) {
  queryClient.setQueryData(getGetOrderQueryKey(orderId), order);
  queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() });
  queryClient.invalidateQueries({ queryKey: getGetQuoteQueryKey(quoteId) });
  queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
  queryClient.invalidateQueries({ queryKey: getGetCheckoutOptionsQueryKey() });
}
