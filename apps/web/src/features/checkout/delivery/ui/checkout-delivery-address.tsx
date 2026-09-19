'use client';

import { Controller, UseFormReturn } from 'react-hook-form';
import { GetCheckoutOptions200DataDeliveryMethodsItemPickupPointsItem } from '@/shared/api/gen/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { CheckoutDeliveryFormValues } from '../model/use-checkout-delivery-form';
import { CheckoutDeliveryAddressCourier } from './checkout-delivery-address-courier';
import { CheckoutDeliveryAddressPickup } from './checkout-delivery-address-pickup';

export function CheckoutDeliveryAddress({
  form,
  method,
  pickupPoints,
}: {
  form: UseFormReturn<CheckoutDeliveryFormValues>;
  method: string | undefined;
  pickupPoints: GetCheckoutOptions200DataDeliveryMethodsItemPickupPointsItem[];
}) {
  const title = method === 'pickup' ? 'Пункт выдачи' : 'Адрес доставки';

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {method === 'pickup' && (
          <Controller
            name="delivery.pickupPointId"
            control={form.control}
            render={({ field, fieldState }) => (
              <CheckoutDeliveryAddressPickup
                pickupPoints={pickupPoints}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        )}
        {method === 'courier' && <CheckoutDeliveryAddressCourier form={form} />}
      </CardContent>
    </Card>
  );
}
