'use client';

import { useCheckoutOptions } from '@/features/checkout/common/use-checkout-options';
import { CartList } from '@/services/cart';
import { GetOrder200Data } from '@/shared/api/gen/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { OrderSummary } from './order-summary';

export function OrderContent({ order }: { order: GetOrder200Data }) {
  const { deliveryMethods } = useCheckoutOptions();

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
        <OrderSummary order={order} deliveryMethods={deliveryMethods} />
      </div>
    </>
  );
}
