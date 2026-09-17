'use client';

import { atomWithStorage } from 'jotai/utils';

const LOCAL_STORAGE_KEY = 'checkout-payment-methos';
export const checkoutPaymentAtom = atomWithStorage<string | undefined>(
  LOCAL_STORAGE_KEY,
  undefined,
);
