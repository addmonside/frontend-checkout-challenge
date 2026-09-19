import type { UseQueryOptions } from '@tanstack/react-query';
import { getOrder, toApiError, useGetOrder } from '@/shared/api';
import { GetOrder200Data } from '@/shared/api/gen/model';

type OrderQueryData = Awaited<ReturnType<typeof getOrder>>;

export function useOrder(
  orderId: string,
  query?: Partial<UseQueryOptions<OrderQueryData, unknown>>,
) {
  const { data, isPending, error, refetch } = useGetOrder(orderId, { query });

  const order =
    typeof data?.data === 'object' &&
    'paymentStatus' in data.data &&
    'status' in data.data &&
    'customer' in data.data
      ? (data.data as unknown as GetOrder200Data)
      : undefined;

  return { order, isPending, error: toApiError(error), refetch };
}
