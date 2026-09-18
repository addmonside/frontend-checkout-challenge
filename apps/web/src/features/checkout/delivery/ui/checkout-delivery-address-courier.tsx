'use client';

import type * as z from 'zod';
import { useEffect, useLayoutEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useSetAtom } from 'jotai/react';
import {
  checkoutDeliveryAddressAtom,
  courierFormTriggerAtom,
} from '../model/checkout-delivery-atom';
import {
  courierAddressSchema,
  useCheckoutDeliveryCourierForm,
} from '../model/use-checkout-delivery-courier-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/kit/field';
import { Input } from '@/shared/ui/kit/input';

type CourierFieldName = keyof z.infer<typeof courierAddressSchema>;

export function CheckoutDeliveryAddressCourier({
  errors,
}: {
  errors?: Partial<Record<CourierFieldName, string>>;
}) {
  const setCourierTrigger = useSetAtom(courierFormTriggerAtom);
  const setAddress = useSetAtom(checkoutDeliveryAddressAtom);
  const { form } = useCheckoutDeliveryCourierForm();
  const values = form.watch();

  useLayoutEffect(() => {
    setCourierTrigger(() => () => form.trigger());
    return () => setCourierTrigger(undefined);
  }, [form, setCourierTrigger]);

  useEffect(() => {
    for (const [name, message] of Object.entries(errors ?? {})) {
      const field = name as CourierFieldName;
      if (message) {
        form.setError(field, { type: 'server', message });
      } else {
        form.clearErrors(field);
      }
    }
  }, [errors, form]);

  useLayoutEffect(() => {
    const parsed = courierAddressSchema.safeParse(values);
    setAddress(parsed.success ? { address: parsed.data } : undefined);
  }, [setAddress, values]);

  return (
    <>
      <FieldGroup>
        <Controller
          name="city"
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
          name="street"
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
          name="house"
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
          name="apartment"
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
