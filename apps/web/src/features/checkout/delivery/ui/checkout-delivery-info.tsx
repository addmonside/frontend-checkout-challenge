import { useAtomValue } from 'jotai/react';
import { CheckoutInfo } from '../../common/checkout-info';
import { checkoutDeliveryMethodAtom } from '../model/checkout-delivery-atom';

export function CheckoutDeliveryInfo({
  subtotal,
  currency,
}: {
  subtotal: number;
  currency: string;
}) {
  const method = useAtomValue(checkoutDeliveryMethodAtom);
  const shipping = !method || (method?.freeFrom ?? 0) < subtotal ? 0 : method.price;
  const total = subtotal + shipping;
  return <CheckoutInfo subtotal={subtotal} currency={currency} shipping={shipping} total={total} />;
}
