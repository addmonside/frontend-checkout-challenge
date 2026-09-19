import { toApiError, useGetOrder } from '@/shared/api';
import { GetOrder200Data } from '@/shared/api/gen/model';

export function useOrder(orderId: string) {
  const { data, isPending, error } = useGetOrder(orderId);

  const order =
    typeof data?.data === 'object' &&
    'paymentStatus' in data.data &&
    'status' in data.data &&
    'customer' in data.data
      ? (data.data as unknown as GetOrder200Data)
      : undefined;

  return { order, isPending, error: toApiError(error) };
}
