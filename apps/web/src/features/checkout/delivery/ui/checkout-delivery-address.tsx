'use client';

import { useAtomValue } from 'jotai/react';
import { ComponentProps } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Field } from '@/shared/ui/kit/field';
import { checkoutDeliveryMethodAtom } from '../model/checkout-delivery-atom';
import { CheckoutDeliveryAddressCourier } from './checkout-delivery-address-courier';
import { CheckoutDeliveryAddressPickup } from './checkout-delivery-address-pickup';

export function CheckoutDeliveryAddress({
  info,
  action: Action,
  errors,
}: {
  info: React.ReactNode;
  action: React.FC<ComponentProps<'button'>>;
  errors?: {
    pickupPointId?: string;
    city?: string;
    street?: string;
    house?: string;
    apartment?: string;
  };
}) {
  const method = useAtomValue(checkoutDeliveryMethodAtom);
  const title = method?.id === 'pickup' ? 'Пункт выдачи' : 'Адрес доставки';

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent as="form" id="checkout-courier-form">
        {method && method.id === 'pickup' && (
          <CheckoutDeliveryAddressPickup
            pickupPoints={method.pickupPoints}
            error={errors?.pickupPointId}
          />
        )}
        {method && method.id === 'courier' && (
          <CheckoutDeliveryAddressCourier
            errors={{
              city: errors?.city,
              street: errors?.street,
              house: errors?.house,
              apartment: errors?.apartment,
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <Field>
          {info}
          <Action type="submit" form="checkout-courier-form" />
        </Field>
      </CardFooter>
    </Card>
  );
}
