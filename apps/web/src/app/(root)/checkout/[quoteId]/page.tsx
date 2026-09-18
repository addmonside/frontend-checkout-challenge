import { Metadata } from 'next';
import { Suspense } from 'react';
import { CheckoutPayment, CheckoutPaymentSkeleton } from '@/features/checkout';
import { PageLayout } from '@/shared/ui/page-layout';

export const metadata: Metadata = {
  title: 'Получение и оплата | Some Shop',
  description: 'Введите данные для получения и оплаты заказа',
};

export default function CheckoutPage({ params }: { params: Promise<{ quoteId: string }> }) {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Данные для получения и оплаты</PageLayout.Title>
      </PageLayout.Header>
      <Suspense fallback={<CheckoutPaymentSkeleton />}>
        <CheckoutPaymentBoundary params={params} />
      </Suspense>
    </PageLayout>
  );
}

async function CheckoutPaymentBoundary({ params }: { params: Promise<{ quoteId: string }> }) {
  const { quoteId } = await params;

  return <CheckoutPayment quoteId={quoteId} />;
}
