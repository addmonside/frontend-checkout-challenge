'use client';

import { ToggleGroup } from '@/shared/ui/kit/toggle-group';
import { GetCheckoutOptions200DataDeliveryMethodsItem } from '@/shared/api/gen/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { FieldError } from '@/shared/ui/kit/field';
import { CheckoutDeliveryMethodItem } from './checkout-delivery-method-item';
import { checkoutDeliveryMethodAtom } from '../model/checkout-delivery-atom';
import { useAtom } from 'jotai/react';

export function CheckoutDeliveryMethod({
  deliveryMethods,
  error,
}: {
  deliveryMethods: GetCheckoutOptions200DataDeliveryMethodsItem[];
  error?: string;
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
        <ToggleGroup
          value={deliveryMethod?.id ? [deliveryMethod?.id] : []}
          onValueChange={handleSelectMethod}
          variant="checkout"
          hasError={!!error}
        >
          {deliveryMethods.map((item) => (
            <CheckoutDeliveryMethodItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              freeFrom={item.freeFrom}
            />
          ))}
        </ToggleGroup>
        {error && <FieldError>{error}</FieldError>}
      </CardContent>
    </Card>
  );
}
