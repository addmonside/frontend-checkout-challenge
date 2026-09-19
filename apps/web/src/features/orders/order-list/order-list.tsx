'use client';

import { useRouter } from 'next/navigation';
import { routes } from '@/shared/model';
import { OrderListSkeleton } from './order-list-skeleton';
import { OrderListTable } from './order-list-table';
import { useOrderList } from './use-order-list';

export function OrderList() {
  const router = useRouter();
  const { orders, isPending } = useOrderList();
  return isPending ? (
    <OrderListSkeleton />
  ) : (
    <OrderListTable orders={orders} onRowClick={({ id }) => router.push(routes.order(id))} />
  );
}
