import { Card, CardContent, CardDescription, CardTitle } from '@/shared/ui/kit/card';
import { Price } from '@/shared/ui/price';
import { useAtomValue } from 'jotai';
import { checkoutDeliveryMethodAtom } from '../model/checkout-delivery-atom';

export function CheckoutInfo({ subtotal, currency }: { subtotal: number; currency: string }) {
  const method = useAtomValue(checkoutDeliveryMethodAtom);
  const delivery = !method || (method?.freeFrom ?? 0) < subtotal ? 0 : method.price;

  return (
    <Card>
      <CardContent>
        <CardDescription>
          Общая сумма: <Price value={subtotal} currency={currency} />
        </CardDescription>
        <CardDescription>
          Доставка: <Price value={delivery} currency={currency} />
        </CardDescription>
        <CardTitle>
          Итого: <Price value={subtotal + delivery} currency={currency} />
        </CardTitle>
      </CardContent>
    </Card>
  );
}
