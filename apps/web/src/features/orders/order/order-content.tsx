import { CartList } from '@/services/cart';
import { GetOrder200Data } from '@/shared/api/gen/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';

export function OrderContent({ order }: { order: GetOrder200Data }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Товары</CardTitle>
        </CardHeader>
        <CardContent>
          <CartList items={order.items} currency={order.currency} hiddenActions />
        </CardContent>
      </Card>
      <div className="sticky top-0 z-20 h-fit flex-1">
        todo: отображаем доставку оплату сли не оплтили, то кнопку оплаты и повторной проверки
      </div>
    </>
  );
}
