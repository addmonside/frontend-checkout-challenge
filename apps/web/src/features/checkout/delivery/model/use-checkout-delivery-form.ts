'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { FieldPath, useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';
import { checkoutDeliveryAtom } from './checkout-delivery-atom';

export const courierAddressSchema = z.object({
  city: z
    .string()
    .min(2, 'Город должен содержать от 2 до 100 символов.')
    .max(100, 'Город должен содержать от 2 до 100 символов.')
    .regex(/\S/, 'Город не должен состоять только из пробелов.'),
  street: z
    .string()
    .min(2, 'Улица должна содержать от 2 до 150 символов.')
    .max(150, 'Улица должна содержать от 2 до 150 символов.')
    .regex(/\S/, 'Улица не должна состоять только из пробелов.'),
  house: z
    .string()
    .min(1, 'Номер дома должен содержать от 1 до 20 символов.')
    .max(20, 'Номер дома должен содержать от 1 до 20 символов.')
    .regex(/\S/, 'Номер дома не должен состоять только из пробелов.'),
  apartment: z.string().max(20, 'Квартира должна содержать не более 20 символов.').optional(),
});

const pickupSchema = z.object({
  method: z.literal('pickup'),
  pickupPointId: z.string().min(1, 'Выберите пункт выдачи'),
});

const courierSchema = z.object({
  method: z.literal('courier'),
  address: courierAddressSchema,
});

export const checkoutDeliveryFormSchema = z.object({
  delivery: z
    .object({
      method: z.enum(['', 'pickup', 'courier']),
      pickupPointId: z.string(),
      address: z.object({
        city: z.string(),
        street: z.string(),
        house: z.string(),
        apartment: z.string(),
      }),
    })
    .superRefine((value, ctx) => {
      if (!value.method) {
        ctx.addIssue({ code: 'custom', path: ['method'], message: 'Выберите способ доставки' });
        return;
      }

      const result =
        value.method === 'pickup' ? pickupSchema.safeParse(value) : courierSchema.safeParse(value);

      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
        }
      }
    }),
});

export type CheckoutDeliveryFormValues = z.infer<typeof checkoutDeliveryFormSchema>;

export function useCheckoutDeliveryForm(errors: Record<string, string>) {
  const [stored, setStored] = useAtom(checkoutDeliveryAtom);

  const form = useForm<CheckoutDeliveryFormValues>({
    resolver: zodResolver(checkoutDeliveryFormSchema),
    defaultValues: {
      delivery: {
        method: stored?.method ?? '',
        pickupPointId: stored?.pickupPointId ?? '',
        address: {
          city: stored?.address?.city ?? '',
          street: stored?.address?.street ?? '',
          house: stored?.address?.house ?? '',
          apartment: stored?.address?.apartment ?? '',
        },
      },
    },
  });

  useEffect(() => {
    for (const [name, message] of Object.entries(errors ?? {})) {
      const field = name as FieldPath<CheckoutDeliveryFormValues>;
      if (message) {
        form.setError(field, { type: 'server', message });
      } else {
        form.clearErrors(field);
      }
    }
  }, [errors, form]);

  const values = useWatch({ control: form.control });

  useEffect(() => {
    setStored({
      method: values.delivery?.method,
      pickupPointId: values.delivery?.pickupPointId,
      address: values.delivery?.address,
    });
  }, [setStored, values]);

  return { form };
}
