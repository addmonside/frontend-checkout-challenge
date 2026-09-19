'use client';

import { Controller, UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/kit/field';
import { Input } from '@/shared/ui/kit/input';
import { CheckoutDeliveryFormValues } from '../model/use-checkout-delivery-form';

export function CheckoutDeliveryAddressCourier({
  form,
}: {
  form: UseFormReturn<CheckoutDeliveryFormValues>;
}) {
  return (
    <>
      <FieldGroup>
        <Controller
          name="delivery.address.city"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="checkout-courier-form-city">Город</FieldLabel>
              <Input
                {...field}
                id="checkout-courier-form-city"
                aria-invalid={fieldState.invalid}
                placeholder="Введите город"
                autoComplete="address-level2"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          name="delivery.address.street"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="checkout-courier-form-street">Улица</FieldLabel>
              <Input
                {...field}
                id="checkout-courier-form-street"
                aria-invalid={fieldState.invalid}
                placeholder="Введите улицу"
                autoComplete="address-line1"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          name="delivery.address.house"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="checkout-courier-form-house">Номер дома</FieldLabel>
              <Input
                {...field}
                id="checkout-courier-form-house"
                aria-invalid={fieldState.invalid}
                placeholder="Введите номер дома"
                autoComplete="address-line2"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          name="delivery.address.apartment"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="checkout-courier-form-apartment">Квартира</FieldLabel>
              <Input
                {...field}
                id="checkout-courier-form-apartment"
                aria-invalid={fieldState.invalid}
                placeholder="Введите номер квартиры"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </>
  );
}
