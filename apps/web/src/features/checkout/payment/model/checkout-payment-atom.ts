'use client';

import { atomWithStorage } from 'jotai/utils';
import { CreateOrderBodyPaymentMethod } from '@/shared/api/gen/model';

type PaymentMethod =
  (typeof CreateOrderBodyPaymentMethod)[keyof typeof CreateOrderBodyPaymentMethod];

const LOCAL_STORAGE_KEY = 'checkout-payment-method';
export const checkoutPaymentAtom = atomWithStorage<PaymentMethod | undefined>(
  LOCAL_STORAGE_KEY,
  undefined,
);
