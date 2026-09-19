'use client';

import { useRouter } from 'next/navigation';
import { useOrder } from '@/services/orders';
import { useErrorRedirect } from '@/services/utility/errors';
import { routes } from '@/shared/model';
import { PageLayout } from '@/shared/ui/page-layout';
import { OrderContent } from './order-content';
import { OrderSkeleton } from './order-skeleton';

export function Order({ orderId }: { orderId: string }) {
  const router = useRouter();
  const { order, isPending, error, refetch } = useOrder(orderId);
  const isRedirected = useErrorRedirect(error);

  if (isRedirected) return null; // защита от моргания перед редиректом

  return isPending ? (
    <OrderSkeleton />
  ) : (
    order && (
      <>
        <PageLayout.Error error={error} />
        <PageLayout.Content variant="checkout">
          <OrderContent
            order={order}
            onPayAction={() => router.push(routes.payment(orderId))}
            onRefreshAction={() => void refetch()}
          />
        </PageLayout.Content>
      </>
    )
  );
}
