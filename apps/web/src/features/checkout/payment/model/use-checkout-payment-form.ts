'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { FieldPath, useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';
import { CreateOrderBodyPaymentMethod } from '@/shared/api/gen/model';
import { checkoutPaymentAtom } from './checkout-payment-atom';

export const checkoutCustomerSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать от 2 до 100 символов.')
    .max(100, 'Имя должно содержать от 2 до 100 символов.')
    .regex(/\S/, 'Имя не должно состоять только из пробелов.'),
  email: z
    .email('Введите корректный email.')
    .max(150, 'Email должен содержать не более 150 символов.'),
  phone: z.string().regex(/^\+[1-9]\d{9,14}$/, 'Телефон должен быть в формате +79990000000.'),
});

export const checkoutPaymentFormSchema = z.object({
  customer: checkoutCustomerSchema,
  paymentMethod: z.enum(CreateOrderBodyPaymentMethod, 'Выберите способ оплаты'),
});

export type CheckoutPaymentFormValues = z.infer<typeof checkoutPaymentFormSchema>;

const EMPTY_CUSTOMER = { name: '', email: '', phone: '' };

export function useCheckoutPaymentForm(errors: Record<string, string>) {
  const [stored, setStored] = useAtom(checkoutPaymentAtom);

  const form = useForm<CheckoutPaymentFormValues>({
    resolver: zodResolver(checkoutPaymentFormSchema),
    defaultValues: {
      customer: stored.customer ?? EMPTY_CUSTOMER,
      paymentMethod: stored.paymentMethod,
    },
  });

  useEffect(() => {
    for (const [name, message] of Object.entries(errors ?? {})) {
      const field = name as FieldPath<CheckoutPaymentFormValues>;
      if (message) {
        form.setError(field, { type: 'server', message });
      } else {
        form.clearErrors(field);
      }
    }
  }, [errors, form]);

  const values = useWatch({ control: form.control });

  useEffect(() => {
    const customer = checkoutCustomerSchema.safeParse(values.customer);
    setStored({
      customer: customer.success ? customer.data : undefined,
      paymentMethod: values.paymentMethod,
    });
  }, [setStored, values]);

  return { form };
}
