'use client';

import {
  CreateQuoteBodyDelivery,
  GetCheckoutOptions200DataDeliveryMethodsItem,
} from '@/shared/api/gen/model';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type CheckoutDeliveryData = DistributiveOmit<CreateQuoteBodyDelivery, 'method'>;

type PickupPointId = Extract<CreateQuoteBodyDelivery, { method: 'pickup' }>['pickupPointId'];

const emptyCourierAddress = (): Extract<
  CreateQuoteBodyDelivery,
  { method: 'courier' }
>['address'] => ({
  city: '',
  street: '',
  house: '',
});

const LOCAL_STORAGE_KEY = 'checkout-delivery-method';
const LOCAL_STORAGE_KEY_ADDITIONAL = 'checkout-delivery-address';

export const checkoutDeliveryMethodAtom = atomWithStorage<
  GetCheckoutOptions200DataDeliveryMethodsItem | undefined
>(LOCAL_STORAGE_KEY, undefined);

export const checkoutDeliveryAddressAtom = atomWithStorage<CheckoutDeliveryData | undefined>(
  LOCAL_STORAGE_KEY_ADDITIONAL,
  undefined,
);

export const courierFormTriggerAtom = atom<(() => Promise<boolean>) | undefined>(undefined);

export const checkoutDeliveryAtom = atom<CreateQuoteBodyDelivery | undefined>((get) => {
  const method = get(checkoutDeliveryMethodAtom);
  const address = get(checkoutDeliveryAddressAtom);

  switch (method?.id) {
    case 'pickup': {
      const pickupPointId = address && 'pickupPointId' in address ? address.pickupPointId : '';
      return { method: 'pickup', pickupPointId: pickupPointId as PickupPointId };
    }
    case 'courier': {
      const courierAddress =
        address && 'address' in address ? address.address : emptyCourierAddress();
      return { method: 'courier', address: courierAddress };
    }
    default:
      return undefined;
  }
});
