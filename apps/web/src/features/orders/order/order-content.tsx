'use client';

import { useCheckoutOptions } from '@/features/checkout/common/use-checkout-options';
import { CartList } from '@/services/cart';
import { GetOrder200Data } from '@/shared/api/gen/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { OrderActions } from './order-actions';
import { OrderSummary } from './order-summary';

export function OrderContent({
  order,
  onPayAction,
  onRefreshAction: onRefreshAction,
}: {
  order: GetOrder200Data;
  onPayAction?: () => void;
  onRefreshAction?: () => void;
}) {
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
        <OrderSummary order={order} deliveryMethods={deliveryMethods}>
          <OrderActions order={order} onPayAction={onPayAction} onRefreshAction={onRefreshAction} />
        </OrderSummary>
      </div>
    </>
  );
}
