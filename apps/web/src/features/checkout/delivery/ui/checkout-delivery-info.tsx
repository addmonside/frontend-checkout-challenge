import { GetCheckoutOptions200DataDeliveryMethodsItem } from '@/shared/api/gen/model';
import { CheckoutInfo } from '../../common/checkout-info';

export function CheckoutDeliveryInfo({
  subtotal,
  currency,
  method,
}: {
  subtotal: number;
  currency: string;
  method?: GetCheckoutOptions200DataDeliveryMethodsItem;
}) {
  const shipping = !method || (method.freeFrom ?? 0) < subtotal ? 0 : method.price;
  const total = subtotal + shipping;
  return <CheckoutInfo subtotal={subtotal} currency={currency} shipping={shipping} total={total} />;
}
