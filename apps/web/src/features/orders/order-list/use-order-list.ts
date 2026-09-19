import { toApiError, useListOrders } from '@/shared/api';
import { ListOrders200DataItem } from '@/shared/api/gen/model';

export function useOrderList() {
  const { data, isPending, error } = useListOrders();

  const orders =
    typeof data?.data === 'object' && Array.isArray(data.data)
      ? (data.data as unknown as ListOrders200DataItem[])
      : [];

  return { orders, isPending, error: toApiError(error) };
}
