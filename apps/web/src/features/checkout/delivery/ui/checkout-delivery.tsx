'use client';

import { CheckoutDeliveryMethod } from './checkout-delivery-method';
import { PageLayout } from '@/shared/ui/page-layout';
import { useCheckoutOptions } from '../../common/use-checkout-options';
import { CartEmpty, CartList } from '@/services/cart';
import { ButtonLink } from '@/shared/ui/button-link';
import { routes } from '@/shared/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { CheckoutDeliveryAddress } from './checkout-delivery-address';
import { useCreateCheckout } from '../model/use-create-quote';
import { Button } from '@/shared/ui/kit/button';
import { CheckoutDeliveryInfo } from './checkout-delivery-info';
import { useRouter } from 'next/navigation';

export function CheckoutDelivery() {
  const router = useRouter();
  const { deliveryMethods, cart, isPending } = useCheckoutOptions();
  const {
    createCheckout,
    isPending: isPendingCheckout,
    fieldErrors,
  } = useCreateCheckout(cart?.version || 0, (data) => {
    router.push(routes.CHECKOUT_QUOTE.replace('[quoteId]', data.id));
  });

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
          info={<CheckoutDeliveryInfo subtotal={cart.subtotal} currency={cart.currency} />}
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
