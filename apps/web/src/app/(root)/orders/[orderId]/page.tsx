import { Metadata } from 'next';
import { Suspense } from 'react';
import { PageLayout } from '@/shared/ui/page-layout';
import { Order, OrderSkeleton } from '@/features/orders';

export const metadata: Metadata = {
  title: 'Заказ | Some Shop',
  description: 'Информация о заказе',
};

export default function OrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Данные для получения и оплаты</PageLayout.Title>
      </PageLayout.Header>
      <Suspense fallback={<OrderSkeleton />}>
        <Boundary params={params} />
      </Suspense>
    </PageLayout>
  );
}

async function Boundary({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;

  return <Order orderId={orderId} />;
}
