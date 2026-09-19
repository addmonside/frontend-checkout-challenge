import { Metadata } from 'next';
import { Suspense } from 'react';
import { Payment, PaymentSkeleton } from '@/features/payment';
import { PageLayout } from '@/shared/ui/page-layout';

export const metadata: Metadata = {
  title: 'Оплата заказа | Some Shop',
  description: 'Тестовая оплата заказа картой',
};

export default function PaymentPage({ params }: { params: Promise<{ orderId: string }> }) {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Оплата заказа</PageLayout.Title>
      </PageLayout.Header>
      <Suspense fallback={<PaymentSkeleton />}>
        <Boundary params={params} />
      </Suspense>
    </PageLayout>
  );
}

async function Boundary({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;

  return <Payment orderId={orderId} />;
}
