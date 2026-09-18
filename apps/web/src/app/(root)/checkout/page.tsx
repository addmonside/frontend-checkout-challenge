import { CheckoutDelivery } from '@/features/checkout';
import { PageLayout } from '@/shared/ui/page-layout';
import { Metadata } from 'next';

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
      <CheckoutDelivery />
    </PageLayout>
  );
}
