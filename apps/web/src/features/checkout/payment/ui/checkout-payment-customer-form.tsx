'use client';

import { Controller } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/kit/field';
import { Input } from '@/shared/ui/kit/input';
import { useCheckoutPaymentCustomerForm } from '../model/use-checkout-payment-customer-form';
import { ComponentProps, ReactNode } from 'react';
import { CreateOrder200DataCustomer } from '@/shared/api/gen/model';

export function CheckoutPaymentCustomerForm({
  info,
  action: Action,
  onSubmit,
}: {
  info: ReactNode;
  action: React.FC<ComponentProps<'button'>>;
  onSubmit: (data: CreateOrder200DataCustomer) => void;
}) {
  const { form, submit } = useCheckoutPaymentCustomerForm(onSubmit);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Введите ваши данные</CardTitle>
      </CardHeader>
      <CardContent as="form" id="checkout-customer-form" onSubmit={submit}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="checkout-customer-form-title">Имя</FieldLabel>
                <Input
                  {...field}
                  id="checkout-customer-form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Введите ваше имя"
                  autoComplete="name"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="checkout-customer-form-phone">Номер телефона</FieldLabel>
                <Input
                  {...field}
                  id="checkout-customer-form-phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="Введите ваш номер телефона"
                  autoComplete="phone"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="checkout-customer-form-email">Почта</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  id="checkout-customer-form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Введите ваш email"
                  autoComplete="email"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Field>
          {info}
          <Action type="submit" form="checkout-customer-form" />
        </Field>
      </CardFooter>
    </Card>
  );
}
