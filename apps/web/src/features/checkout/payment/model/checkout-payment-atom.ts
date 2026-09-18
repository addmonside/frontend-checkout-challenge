'use client';

import { CreateOrderBodyPaymentMethod } from '@/shared/api/gen/model';
import { atomWithStorage } from 'jotai/utils';

type PaymentMethod =
  (typeof CreateOrderBodyPaymentMethod)[keyof typeof CreateOrderBodyPaymentMethod];

const LOCAL_STORAGE_KEY = 'checkout-payment-method';
export const checkoutPaymentAtom = atomWithStorage<PaymentMethod | undefined>(
  LOCAL_STORAGE_KEY,
  undefined,
);
