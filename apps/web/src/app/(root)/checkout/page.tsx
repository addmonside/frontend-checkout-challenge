import { Checkout } from '@/features/checkout/checkout';
import { PageLayout } from '@/shared/ui/page-layout';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Оформление | Some Shop',
  description: 'Оформление заказа',
};

export default function CheckoutPage() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Оформление заказа</PageLayout.Title>
      </PageLayout.Header>
      <Suspense fallback={<div>loading...</div>}>
        <Checkout />
      </Suspense>
    </PageLayout>
  );
}
