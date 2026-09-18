import { CartList } from '@/services/cart';
import {
  CreateOrderBody,
  GetCheckoutOptions200DataPaymentMethodsItem,
  GetQuote200Data,
} from '@/shared/api/gen/model';
import { Button } from '@/shared/ui/kit/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { CheckoutInfo } from '../../common/checkout-info';
import { CheckoutPaymentCustomerForm } from './checkout-payment-customer-form';
import { CheckoutPaymentMethod } from './checkout-payment-method';

export function CheckoutPaymentContent({
  quote,
  paymentMethods,
  onSubmit,
  isPending,
  fieldErrors,
}: {
  quote: GetQuote200Data;
  paymentMethods: GetCheckoutOptions200DataPaymentMethodsItem[];
  onSubmit: (customer: CreateOrderBody['customer']) => void;
  isPending: boolean;
  fieldErrors: Record<string, string>;
}) {
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
        <CheckoutPaymentMethod
          paymentMethods={paymentMethods}
          error={fieldErrors['paymentMethod']}
        />
        <CheckoutPaymentCustomerForm
          info={
            <CheckoutInfo
              subtotal={quote.subtotal}
              currency={quote.currency}
              shipping={quote.shipping}
              total={quote.total}
            />
          }
          onSubmit={onSubmit}
          action={(props) => (
            <Button variant="checkout" isPending={isPending} {...props}>
              Сохранить
            </Button>
          )}
        />
      </div>
    </>
  );
}
