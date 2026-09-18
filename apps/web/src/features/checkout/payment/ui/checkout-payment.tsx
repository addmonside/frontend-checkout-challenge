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
  const { paymentMethods, isPending, error: checkoutError } = useCheckoutOptions();
  const { quote, isPending: isPendingQuote, error: quoteError, isSlateData } = useQuote(quoteId);
  const { createOrder, isPending: isPendingCheckout, error: orderError } = useCreateOrder(quoteId);

  useEffect(() => {
    if (isSlateData) router.replace(routes.CHECKOUT);
  }, [isSlateData, router]);

  if (isSlateData) return null; // защита от флеша  router.replace()

  const goToCheckout = () => router.push(routes.CHECKOUT);

  return isPending && isPendingQuote ? (
    <div>Loading...</div>
  ) : (
    <>
      <PageLayout.Content>
        <PageLayout.Error error={orderError || quoteError || checkoutError} />
      </PageLayout.Content>
      {!!quote?.items.length && paymentMethods ? (
        <>
          <PageLayout.Content>
            <CheckoutPaymentStatus expiresAt={quote.expiresAt} onRecalculate={goToCheckout} />
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
      )}
    </>
  );
}
