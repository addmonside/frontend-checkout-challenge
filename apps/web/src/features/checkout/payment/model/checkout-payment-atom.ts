'use client';

import { atomWithStorage } from 'jotai/utils';
import { CreateOrderBody } from '@/shared/api/gen/model';

export type CheckoutPaymentDraft = {
  customer?: CreateOrderBody['customer'];
  paymentMethod?: CreateOrderBody['paymentMethod'];
};

export const checkoutPaymentAtom = atomWithStorage<CheckoutPaymentDraft>(
  'checkout-payment',
  {},
  undefined,
  { getOnInit: true },
);
