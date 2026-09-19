'use client';

import { Controller, UseFormReturn, useWatch } from 'react-hook-form';
import { GetCheckoutOptions200DataDeliveryMethodsItem } from '@/shared/api/gen/model';
import { Button } from '@/shared/ui/kit/button';
import { Card, CardFooter } from '@/shared/ui/kit/card';
import { Field } from '@/shared/ui/kit/field';
import { CheckoutDeliveryFormValues } from '../model/use-checkout-delivery-form';
import { CheckoutDeliveryAddress } from './checkout-delivery-address';
import { CheckoutDeliveryInfo } from './checkout-delivery-info';
import { CheckoutDeliveryMethod } from './checkout-delivery-method';

export function CheckoutDeliveryForm({
  form,
  deliveryMethods,
  subtotal,
  currency,
  isPending,
  onSubmitAction,
}: {
  form: UseFormReturn<CheckoutDeliveryFormValues>;
  deliveryMethods: GetCheckoutOptions200DataDeliveryMethodsItem[];
  subtotal: number;
  currency: string;
  isPending: boolean;
  onSubmitAction: (values: CheckoutDeliveryFormValues) => void;
}) {
  const method = useWatch({ control: form.control, name: 'delivery.method' });
  const selectedMethod = deliveryMethods.find((item) => item.id === method);
  const pickupPoints = selectedMethod?.pickupPoints ?? [];

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmitAction)}>
      <Controller
        name="delivery.method"
        control={form.control}
        render={({ field, fieldState }) => (
          <CheckoutDeliveryMethod
            deliveryMethods={deliveryMethods}
            value={field.value}
            onChangeAction={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <CheckoutDeliveryAddress form={form} method={method} pickupPoints={pickupPoints} />
      <Card>
        <CardFooter>
          <Field>
            <CheckoutDeliveryInfo subtotal={subtotal} currency={currency} method={selectedMethod} />
            <Button type="submit" variant="checkout" isPending={isPending}>
              Оформить
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
