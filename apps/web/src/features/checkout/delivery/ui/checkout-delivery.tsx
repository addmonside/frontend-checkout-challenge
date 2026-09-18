'use client';

import { CheckoutDeliveryMethod } from './checkout-delivery-method';
import { PageLayout } from '@/shared/ui/page-layout';
import { useCheckoutOptions } from '../../common/use-checkout-options';
import { CartEmpty, CartList } from '@/services/cart';
import { ButtonLink } from '@/shared/ui/button-link';
import { routes } from '@/shared/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { CheckoutDeliveryAddress } from './checkout-delivery-address';
import { CheckoutInfo } from '../../common/checkout-info';
import { useCreateCheckout } from '../model/use-create-quote';
import { Button } from '@/shared/ui/kit/button';

export function CheckoutDelivery() {
  const { deliveryMethods, cart, isPending } = useCheckoutOptions();
  const {
    createCheckout,
    isPending: isPendingCheckout,
    fieldErrors,
  } = useCreateCheckout(cart?.version || 0);

  return isPending ? (
    <div>Loading...</div>
  ) : !!cart?.items.length && deliveryMethods ? (
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
        <CheckoutDeliveryMethod
          deliveryMethods={deliveryMethods}
          error={fieldErrors['delivery.method']}
        />
        <CheckoutDeliveryAddress
          info={<CheckoutInfo subtotal={cart.subtotal} currency={cart.currency} />}
          errors={{
            pickupPointId: fieldErrors['delivery.pickupPointId'],
            city: fieldErrors['delivery.address.city'],
            street: fieldErrors['delivery.address.street'],
            house: fieldErrors['delivery.address.house'],
            apartment: fieldErrors['delivery.address.apartment'],
          }}
          action={(props) => (
            <Button
              variant="checkout"
              onClick={createCheckout}
              isPending={isPendingCheckout}
              {...props}
            >
              Оформить
            </Button>
          )}
        />
      </div>
    </PageLayout.Content>
  ) : (
    <CartEmpty renderAction={<ButtonLink href={routes.HOME}>За покупками</ButtonLink>} />
  );
}
