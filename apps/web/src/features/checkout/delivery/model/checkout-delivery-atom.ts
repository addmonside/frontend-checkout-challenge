'use client';

import { atomWithStorage } from 'jotai/utils';

export type CheckoutDeliveryDraft = {
  method?: '' | 'pickup' | 'courier';
  pickupPointId?: string;
  address?: {
    city?: string;
    street?: string;
    house?: string;
    apartment?: string;
  };
};

export const checkoutDeliveryAtom = atomWithStorage<CheckoutDeliveryDraft | undefined>(
  'checkout-delivery',
  undefined,
  undefined,
  { getOnInit: true },
);
