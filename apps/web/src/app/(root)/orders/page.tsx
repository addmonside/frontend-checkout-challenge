import { Metadata } from 'next';
import { Suspense } from 'react';
import { OrderList, OrderListSkeleton } from '@/features/orders';
import { PageLayout } from '@/shared/ui/page-layout';

export const metadata: Metadata = {
  title: 'Заказы | Some Shop',
  description: 'Список заказов',
};

export default function CheckoutPage() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Заказы</PageLayout.Title>
      </PageLayout.Header>
      <PageLayout.Content>
        <Suspense fallback={<OrderListSkeleton />}>
          <OrderList />
        </Suspense>
      </PageLayout.Content>
    </PageLayout>
  );
}
