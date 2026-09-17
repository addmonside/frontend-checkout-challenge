'use client';

import { GetCheckoutOptions200DataDeliveryMethodsItem } from '@/shared/api/gen/model';
import { atomWithStorage } from 'jotai/utils';

const LOCAL_STORAGE_KEY = 'checkout-delivery-method';
export const checkoutDeliveryMethodAtom = atomWithStorage<
  GetCheckoutOptions200DataDeliveryMethodsItem | undefined
>(LOCAL_STORAGE_KEY, undefined);
