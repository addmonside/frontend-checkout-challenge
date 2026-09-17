'use client';

import { ToggleGroup } from '@/shared/ui/kit/toggle-group';
import { GetCheckoutOptions200DataDeliveryMethodsItem } from '@/shared/api/gen/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { CheckoutDeliveryItem } from './checkout-delivery-item';
import { checkoutDeliveryMethodAtom } from '../model/checkout-delivery-atom';
import { useAtom } from 'jotai/react';

export function CheckoutDelivery({
  deliveryMethods,
}: {
  deliveryMethods: GetCheckoutOptions200DataDeliveryMethodsItem[] | undefined;
}) {
  const [deliveryMethod, setDeliveryMethod] = useAtom(checkoutDeliveryMethodAtom);

  const handleSelectMethod = (ids: string[]) => {
    const method = deliveryMethods?.find((m) => ids.includes(m.id));
    setDeliveryMethod(method);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Способы доставки</CardTitle>
      </CardHeader>
      <CardContent>
        {!!deliveryMethods ? (
          <ToggleGroup
            value={deliveryMethod?.id ? [deliveryMethod?.id] : []}
            onValueChange={handleSelectMethod}
            variant="checkout"
          >
            {deliveryMethods.map((item) => (
              <CheckoutDeliveryItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                freeFrom={item.freeFrom}
              />
            ))}
          </ToggleGroup>
        ) : (
          'empty'
        )}
      </CardContent>
    </Card>
  );
}
