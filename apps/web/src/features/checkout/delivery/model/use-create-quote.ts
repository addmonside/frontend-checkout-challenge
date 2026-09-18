import { useCreateQuote } from '@/shared/api';
import { ApiError } from '@/shared/api';
import { useAtomValue } from 'jotai';
import { checkoutDeliveryAtom, courierFormTriggerAtom } from './checkout-delivery-atom';
import { useMemo, useState } from 'react';

function buildClientFieldErrors(delivery?: {
  method: 'pickup' | 'courier';
  pickupPointId?: string;
}) {
  const errors: Record<string, string> = {};

  if (!delivery) {
    errors['delivery.method'] = 'Выберите способ доставки';
    return errors;
  }

  if (delivery.method === 'pickup' && !delivery.pickupPointId) {
    errors['delivery.pickupPointId'] = 'Выберите пункт выдачи';
  }

  return errors;
}

function toApiFieldErrors(error: unknown): Record<string, string> {
  return error instanceof ApiError ? error.toFieldErrorMap() : {};
}

export function useCreateCheckout(cartVersion: number) {
  const { mutate, isPending, error } = useCreateQuote();
  const delivery = useAtomValue(checkoutDeliveryAtom);
  const courierTrigger = useAtomValue(courierFormTriggerAtom);
  const [attempted, setAttempted] = useState(false);

  const fieldErrors = useMemo(() => {
    const clientErrors = attempted ? buildClientFieldErrors(delivery) : {};
    return { ...clientErrors, ...toApiFieldErrors(error) };
  }, [attempted, delivery, error]);

  const handleCreate = async () => {
    setAttempted(true);

    if (!delivery) return;
    if (delivery.method === 'pickup' && !delivery.pickupPointId) return;

    if (delivery.method === 'courier' && courierTrigger) {
      const isValid = await courierTrigger();
      if (!isValid) return;
    }

    mutate({ data: { cartVersion, delivery } });
  };

  return { createCheckout: handleCreate, isPending, fieldErrors };
}
