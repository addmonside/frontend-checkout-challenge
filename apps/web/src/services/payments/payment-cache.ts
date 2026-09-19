import type { QueryClient } from '@tanstack/react-query';
import { getGetOrderQueryKey, getListPaymentsQueryKey } from '@/shared/api';

/** После изменения попытки оплаты обновляем и заказ, и список попыток. */
export function invalidateOrderPayments(queryClient: QueryClient, orderId: string) {
  queryClient.invalidateQueries({ queryKey: getListPaymentsQueryKey(orderId) });
  queryClient.invalidateQueries({ queryKey: getGetOrderQueryKey(orderId) });
}
