'use client';

import { Controller } from 'react-hook-form';
import {
  GetCheckoutOptions200DataPaymentMethodsItem,
  GetQuote200Data,
} from '@/shared/api/gen/model';
import { Button } from '@/shared/ui/kit/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/kit/field';
import { Input } from '@/shared/ui/kit/input';
import { CheckoutInfo } from '../../common/checkout-info';
import {
  CheckoutPaymentFormValues,
  useCheckoutPaymentForm,
} from '../model/use-checkout-payment-form';
import { CheckoutPaymentMethod } from './checkout-payment-method';

export function CheckoutPaymentForm({
  quote,
  paymentMethods,
  isPending,
  fieldErrors,
  onSubmit,
}: {
  quote: GetQuote200Data;
  paymentMethods: GetCheckoutOptions200DataPaymentMethodsItem[] | undefined;
  isPending: boolean;
  fieldErrors: Record<string, string>;
  onSubmit: (values: CheckoutPaymentFormValues) => void;
}) {
  const { form } = useCheckoutPaymentForm(fieldErrors);
  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="paymentMethod"
        control={form.control}
        render={({ field, fieldState }) => (
          <CheckoutPaymentMethod
            paymentMethods={paymentMethods}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Введите ваши данные</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              name="customer.name"
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
              name="customer.phone"
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
              name="customer.email"
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
      </Card>
      <Card>
        <CardFooter>
          <Field>
            <CheckoutInfo
              subtotal={quote.subtotal}
              currency={quote.currency}
              shipping={quote.shipping}
              total={quote.total}
            />
            <Button type="submit" variant="checkout" isPending={isPending}>
              Сохранить
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
