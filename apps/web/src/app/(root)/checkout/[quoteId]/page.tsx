import { CheckoutPayment } from '@/features/checkout';
import { PageLayout } from '@/shared/ui/page-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Получение и оплата | Some Shop',
  description: 'Введите данные для получения и оплаты заказа',
};

export default async function CheckoutPage({ params }: { params: Promise<{ quoteId: string }> }) {
  const { quoteId } = await params;

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Данные для получения и оплаты</PageLayout.Title>
      </PageLayout.Header>
      <CheckoutPayment quoteId={quoteId} />
    </PageLayout>
  );
}
