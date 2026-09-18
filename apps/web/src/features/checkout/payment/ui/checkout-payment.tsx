'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@/shared/ui/page-layout';
import { useCheckoutOptions } from '../../common/use-checkout-options';
import { CartEmpty } from '@/services/cart';
import { ButtonLink } from '@/shared/ui/button-link';
import { routes } from '@/shared/model';
import { useQuote } from '../model/use-qoute';
import { useCreateOrder } from '../model/use-create-order';
import { CheckoutPaymentStatus } from './checkout-payment-status';
import { CheckoutPaymentContent } from './checkout-payment-content';

export function CheckoutPayment({ quoteId }: { quoteId: string }) {
  const router = useRouter();
  const { paymentMethods, isPending } = useCheckoutOptions();
  const { quote, isPending: isPendingQuote, error: quoteError } = useQuote(quoteId);
  const { createOrder, isPending: isPendingCheckout, error: orderError } = useCreateOrder(quoteId);

  // ! расчёт удалён или недоступен — вернуться на шаг доставки
  const quoteLoadStale = !!quoteError?.isStaleData;

  useEffect(() => {
    if (quoteLoadStale) router.replace(routes.CHECKOUT);
  }, [quoteLoadStale, router]);

  if (quoteLoadStale) return null;

  const goToCheckout = () => router.push(routes.CHECKOUT);

  return isPending && isPendingQuote ? (
    <div>Loading...</div>
  ) : !!quote?.items.length && paymentMethods ? (
    <>
      <PageLayout.Content>
        <CheckoutPaymentStatus expiresAt={quote.expiresAt} onRecalculate={goToCheckout} />
      </PageLayout.Content>
      <PageLayout.Content>
        <PageLayout.Error error={orderError || quoteError} />
      </PageLayout.Content>
      <PageLayout.Content variant="checkout">
        <CheckoutPaymentContent
          quote={quote}
          paymentMethods={paymentMethods}
          isPending={isPendingCheckout}
          onSubmit={createOrder}
        />
      </PageLayout.Content>
    </>
  ) : (
    <CartEmpty renderAction={<ButtonLink href={routes.HOME}> покупками</ButtonLink>} />
  );
}
