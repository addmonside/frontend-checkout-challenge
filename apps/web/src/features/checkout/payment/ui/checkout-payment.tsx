'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CartEmpty } from '@/services/cart';
import { useErrorPageRedirect } from '@/services/utility/errors';
import { routes } from '@/shared/model';
import { ButtonLink } from '@/shared/ui/button-link';
import { PageLayout } from '@/shared/ui/page-layout';
import { useCheckoutOptions } from '../../common/use-checkout-options';
import { useCreateOrder } from '../model/use-create-order';
import { useQuote } from '../model/use-qoute';
import { CheckoutPaymentContent } from './checkout-payment-content';
import { CheckoutPaymentStatus } from './checkout-payment-status';

export function CheckoutPayment({ quoteId }: { quoteId: string }) {
  const router = useRouter();
  const goToErrorPage = useErrorPageRedirect();
  const { paymentMethods, isPending, error: checkoutError } = useCheckoutOptions();
  const { quote, isPending: isPendingQuote, error: quoteError, isSlateData } = useQuote(quoteId);
  const { createOrder, isPending: isPendingCheckout, error: orderError } = useCreateOrder(quoteId);

  const isNotFound = quoteError?.status === 404;
  const isStaleReload = isSlateData && !isNotFound;
  const error = orderError || quoteError || checkoutError;

  useEffect(() => {
    if (isNotFound) {
      goToErrorPage(quoteError);
      return;
    }
    if (isStaleReload) {
      router.replace(routes.CHECKOUT);
      return;
    }
  }, [goToErrorPage, isNotFound, isSlateData, isStaleReload, quoteError, router]);

  if (isNotFound || isStaleReload) return null; // защита от флеша перед редиректом

  const goToCheckout = () => router.push(routes.CHECKOUT);

  return isPending && isPendingQuote ? (
    <div>Loading...</div>
  ) : (
    <>
      <PageLayout.Content>
        <PageLayout.Error error={error} />
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
