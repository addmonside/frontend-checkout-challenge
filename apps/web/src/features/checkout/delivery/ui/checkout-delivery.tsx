'use client';

import { useRouter } from 'next/navigation';
import { CartEmpty, CartList } from '@/services/cart';
import { routes } from '@/shared/model';
import { ButtonLink } from '@/shared/ui/button-link';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { PageLayout } from '@/shared/ui/page-layout';
import { useCheckoutOptions } from '../../common/use-checkout-options';
import {
  CheckoutDeliveryFormValues,
  useCheckoutDeliveryForm,
} from '../model/use-checkout-delivery-form';
import { useCreateCheckout } from '../model/use-create-quote';
import { CheckoutDeliveryForm } from './checkout-delivery-form';

export function CheckoutDelivery() {
  const router = useRouter();
  const { deliveryMethods, cart, isPending } = useCheckoutOptions();
  const {
    createCheckout,
    isPending: isPendingCheckout,
    fieldErrors,
  } = useCreateCheckout(cart?.version || 0, (data) => {
    router.push(routes.checkoutQuote(data.id));
  });
  const { form } = useCheckoutDeliveryForm(fieldErrors);

  const handleSubmit = (values: CheckoutDeliveryFormValues) => {
    createCheckout(
      values.delivery.method === 'pickup'
        ? {
            method: 'pickup',
            pickupPointId: values.delivery.pickupPointId as 'point-center' | 'point-north',
          }
        : { method: 'courier', address: values.delivery.address },
    );
  };

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
        <CheckoutDeliveryForm
          form={form}
          deliveryMethods={deliveryMethods}
          subtotal={cart.subtotal}
          currency={cart.currency}
          isPending={isPendingCheckout}
          onSubmitAction={handleSubmit}
        />
      </div>
    </PageLayout.Content>
  ) : (
    <CartEmpty renderAction={<ButtonLink href={routes.HOME}>За покупками</ButtonLink>} />
  );
}
