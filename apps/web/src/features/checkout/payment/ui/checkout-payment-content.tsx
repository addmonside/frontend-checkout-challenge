'use client';

import { CartList } from '@/services/cart';
import {
  CreateOrderBody,
  GetCheckoutOptions200DataPaymentMethodsItem,
  GetQuote200Data,
} from '@/shared/api/gen/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { CheckoutPaymentFormValues } from '../model/use-checkout-payment-form';
import { CheckoutPaymentForm } from './checkout-payment-form';

export function CheckoutPaymentContent({
  quote,
  paymentMethods,
  onSubmit,
  isPending,
  fieldErrors,
}: {
  quote: GetQuote200Data;
  paymentMethods: GetCheckoutOptions200DataPaymentMethodsItem[];
  onSubmit: (v: CreateOrderBody) => void;
  isPending: boolean;
  fieldErrors: Record<string, string>;
}) {
  const handleSubmit = (values: CheckoutPaymentFormValues) => {
    onSubmit({ quoteId: quote.id, ...values });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Товары</CardTitle>
        </CardHeader>
        <CardContent>
          <CartList items={quote.items} currency={quote.currency} hiddenActions />
        </CardContent>
      </Card>
      <div className="sticky top-0 z-20 h-fit flex-1">
        <CheckoutPaymentForm
          quote={quote}
          paymentMethods={paymentMethods}
          isPending={isPending}
          fieldErrors={fieldErrors}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
