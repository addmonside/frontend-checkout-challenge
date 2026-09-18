import { CartList } from '@/services/cart';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { CheckoutPaymentMethod } from './checkout-payment-method';
import { CheckoutPaymentCustomerForm } from './checkout-payment-customer-form';
import { CheckoutInfo } from '../../common/checkout-info';
import { Button } from '@/shared/ui/kit/button';
import {
  CreateOrderBody,
  GetCheckoutOptions200DataPaymentMethodsItem,
  GetQuote200Data,
} from '@/shared/api/gen/model';

export function CheckoutPaymentContent({
  quote,
  paymentMethods,
  onSubmit,
  isPending,
}: {
  quote: GetQuote200Data;
  paymentMethods: GetCheckoutOptions200DataPaymentMethodsItem[];
  onSubmit: (customer: CreateOrderBody['customer']) => void;
  isPending: boolean;
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
      <div className="sticky top-0 z-20 h-fit">
        <CheckoutPaymentMethod
          paymentMethods={paymentMethods}
          // error={fieldErrors['delivery.method']}
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
          // errors={{
          //   pickupPointId: fieldErrors['delivery.pickupPointId'],
          //   city: fieldErrors['delivery.address.city'],
          //   street: fieldErrors['delivery.address.street'],
          //   house: fieldErrors['delivery.address.house'],
          //   apartment: fieldErrors['delivery.address.apartment'],
          // }}
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
