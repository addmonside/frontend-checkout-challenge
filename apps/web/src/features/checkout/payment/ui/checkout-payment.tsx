'use client';

import { useRouter } from 'next/navigation';
import { CartEmpty } from '@/services/cart';
import { useErrorRedirect } from '@/services/utility/errors';
import { routes } from '@/shared/model';
import { ButtonLink } from '@/shared/ui/button-link';
import { PageLayout } from '@/shared/ui/page-layout';
import { useCheckoutOptions } from '../../common/use-checkout-options';
import { useCreateOrder } from '../model/use-create-order';
import { useQuote } from '../model/use-qoute';
import { CheckoutPaymentContent } from './checkout-payment-content';
import { CheckoutPaymentSkeleton } from './checkout-payment-skeleton';
import { CheckoutPaymentStatus } from './checkout-payment-status';

export function CheckoutPayment({ quoteId }: { quoteId: string }) {
  const router = useRouter();
  const { paymentMethods, isPending, error: checkoutError } = useCheckoutOptions();
  const { quote, isPending: isPendingQuote, error: quoteError } = useQuote(quoteId);
  const {
    createOrder,
    isPending: isPendingCheckout,
    error: orderError,
    fieldErrors,
  } = useCreateOrder(quoteId, (data) => {
    router.push(routes.order(data.id));
  });

  const isRedirected = useErrorRedirect(quoteError, { staleTo: routes.CHECKOUT });
  if (isRedirected) return null; // защита от моргания перед редиректом

  const error = orderError?.isValidation ? undefined : orderError || quoteError || checkoutError;

  return isPending && isPendingQuote ? (
    <CheckoutPaymentSkeleton />
  ) : (
    <>
      <PageLayout.Error error={error} />
      {!!quote?.items.length && paymentMethods ? (
        <>
          <CheckoutPaymentStatus expiresAt={quote.expiresAt} />
          <PageLayout.Content variant="checkout">
            <CheckoutPaymentContent
              quote={quote}
              paymentMethods={paymentMethods}
              isPending={isPendingCheckout}
              fieldErrors={fieldErrors}
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
