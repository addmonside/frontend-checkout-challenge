import { PageLayout } from '@/shared/ui/page-layout';
import { Metadata } from 'next';
import { Suspense } from 'react';

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
      <Suspense fallback={<div>loading...</div>}>список заказов</Suspense>
    </PageLayout>
  );
}
