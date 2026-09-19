import { toApiError, useListPayments } from '@/shared/api';
import { ListPayments200DataItem } from '@/shared/api/gen/model';

export function usePayments(orderId: string) {
  const { data, isPending, error } = useListPayments(orderId);

  const payments =
    typeof data?.data === 'object' && Array.isArray(data.data)
      ? (data.data as unknown as ListPayments200DataItem[])
      : [];

  return { payments, isPending, error: toApiError(error) };
}
