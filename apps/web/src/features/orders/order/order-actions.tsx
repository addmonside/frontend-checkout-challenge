'use client';

import { GetOrder200Data } from '@/shared/api/gen/model';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/kit/alert';
import { Button } from '@/shared/ui/kit/button';
import { getOrderPaymentAction } from '../common/order-payment-action';

export function OrderActions({
  order,
  onPay,
  onRefresh,
}: {
  order: GetOrder200Data;
  onPay?: () => void;
  onRefresh?: () => void;
}) {
  const action = getOrderPaymentAction(order);

  if (action.kind === 'cash') {
    return (
      <Alert>
        <AlertTitle>Заказ оформлен</AlertTitle>
        <AlertDescription>Оплата при получении.</AlertDescription>
      </Alert>
    );
  }

  if (action.kind === 'paid') {
    return (
      <Alert>
        <AlertTitle>Заказ оплачен</AlertTitle>
        <AlertDescription>Спасибо за покупку!</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {action.kind === 'pending' ? (
        <Alert>
          <AlertTitle>Оплата обрабатывается</AlertTitle>
          <AlertDescription>Проверьте статус через несколько секунд.</AlertDescription>
        </Alert>
      ) : (
        <Button type="button" variant="checkout" onClick={onPay}>
          {action.retry ? 'Оплатить снова' : 'Оплатить'}
        </Button>
      )}
      <Button type="button" variant="outline" onClick={onRefresh}>
        Проверить оплату
      </Button>
    </>
  );
}
