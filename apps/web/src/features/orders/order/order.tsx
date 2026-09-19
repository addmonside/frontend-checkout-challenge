'use client';

import { useErrorRedirect } from '@/services/utility/errors';
import { PageLayout } from '@/shared/ui/page-layout';
import { OrderContent } from './order-content';
import { OrderSkeleton } from './order-skeleton';
import { useOrder } from './use-order';

export function Order({ orderId }: { orderId: string }) {
  const { order, isPending, error } = useOrder(orderId);
  const isRedirected = useErrorRedirect(error);

  if (isRedirected) return null; // защита от моргания перед редиректом

  return isPending ? (
    <OrderSkeleton />
  ) : (
    order && (
      <>
        <PageLayout.Error error={error} />

        <PageLayout.Content variant="checkout">
          <OrderContent order={order} />
        </PageLayout.Content>
      </>
    )
  );
}
