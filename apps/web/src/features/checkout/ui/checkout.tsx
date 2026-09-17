'use client';

import { CheckoutDelivery } from './checkout-delivery';
import { CheckoutPayment } from './checkout-payment';
import { PageLayout } from '@/shared/ui/page-layout';
import { useCheckoutOptions } from '../model/use-checkout-options';
import { CartEmpty, CartList } from '@/services/cart';
import { ButtonLink } from '@/shared/ui/button-link';
import { routes } from '@/shared/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { CheckoutButton } from './checkout-button';
import { CheckoutInfo } from './checkout-info';

export function Checkout() {
  const { deliveryMethods, paymentMethods, cart, isPending } = useCheckoutOptions();
  return isPending ? (
    <div>Loading...</div>
  ) : !!cart?.items.length ? (
    <PageLayout.Content variant="checkout">
      <Card>
        <CardHeader>
          <CardTitle>Товары</CardTitle>
        </CardHeader>
        <CardContent>
          <CartList items={cart.items} currency={cart.currency} />
        </CardContent>
      </Card>
      <div className="sticky top-0 z-20 h-fit">
        <CheckoutDelivery deliveryMethods={deliveryMethods} />
        <CheckoutPayment paymentMethods={paymentMethods} />
        <CheckoutInfo subtotal={cart.subtotal} currency={cart.currency} />
        <CheckoutButton />
      </div>
    </PageLayout.Content>
  ) : (
    <CartEmpty renderAction={<ButtonLink href={routes.HOME}>За покупками</ButtonLink>} />
  );
}
