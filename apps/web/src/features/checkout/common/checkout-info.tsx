import { CardDescription, CardTitle } from '@/shared/ui/kit/card';
import { Price } from '@/shared/ui/price';

export function CheckoutInfo({
  subtotal,
  currency,
  shipping,
  total,
}: {
  subtotal: number;
  currency: string;
  shipping: number;
  total: number;
}) {
  return (
    <>
      <CardDescription>
        Общая сумма: <Price value={subtotal} currency={currency} />
      </CardDescription>
      <CardDescription>
        Доставка: <Price value={shipping} currency={currency} />
      </CardDescription>
      <CardTitle>
        Итого: <Price value={total} currency={currency} />
      </CardTitle>
    </>
  );
}
