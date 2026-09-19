'use client';

import { ReactNode } from 'react';
import { GetOrder200Data } from '@/shared/api/gen/model';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/kit/alert';
import { Button } from '@/shared/ui/kit/button';

export type OrderPaymentAction = 'cash' | 'paid' | 'pending' | 'pay' | 'retry';

export function OrderActions({
  order,
  onPayAction,
  onRefreshAction,
}: {
  order: GetOrder200Data;
  onPayAction?: () => void;
  onRefreshAction?: () => void;
}) {
  const kind = getOrderPaymentAction(order);
  const d = data.get(kind) ?? data.get('default')!;

  return (
    <>
      {(d.title || d.description) && (
        <Alert>
          {d.title && <AlertTitle>{d.title}</AlertTitle>}
          {d.description && <AlertDescription>{d.description}</AlertDescription>}
        </Alert>
      )}
      {d.payButton?.(onPayAction)}
      {d.refreshButton?.(onRefreshAction)}
    </>
  );
}

/**
 * Определяет, какое действие доступно по оплате заказа.
 * Наличные и уже оплаченный заказ действий не требуют.
 */
export function getOrderPaymentAction(order: GetOrder200Data): OrderPaymentAction {
  if (order.paymentMethod === 'cash_on_delivery') return 'cash';
  if (order.paymentStatus === 'succeeded') return 'paid';
  if (order.paymentStatus === 'pending') return 'pending';
  if (order.paymentStatus === 'failed' || order.paymentStatus === 'cancelled') return 'retry';
  return 'pay';
}

const data = new Map<
  string,
  {
    title?: string;
    description?: string;
    payButton?: (onClick?: () => void) => ReactNode;
    refreshButton?: (onClick?: () => void) => ReactNode;
  }
>([
  ['cash', { title: 'Заказ оформлен', description: 'Оплата при получении.' }],
  ['paid', { title: 'Заказ оплачен', description: 'Спасибо за покупку!' }],
  [
    'pending',
    {
      title: 'Оплата обрабатывается',
      description: 'Проверьте статус через несколько секунд.',
      payButton: (onClick) => <PayButton title="Продолжить оплату" onClick={onClick} />,
      refreshButton: (onClick) => <RefreshButton onClick={onClick} />,
    },
  ],
  [
    'retry',
    {
      payButton: (onClick) => <PayButton title="Оплатить снова" onClick={onClick} />,
      refreshButton: (onClick) => <RefreshButton onClick={onClick} />,
    },
  ],
  [
    'default',
    {
      payButton: (onClick) => <PayButton title="Оплатить" onClick={onClick} />,
      refreshButton: (onClick) => <RefreshButton onClick={onClick} />,
    },
  ],
]);

function PayButton({ title, onClick }: { title: string; onClick?: () => void }) {
  return (
    <Button type="button" variant="checkout" onClick={onClick}>
      {title}
    </Button>
  );
}

function RefreshButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button type="button" variant="outline" onClick={onClick}>
      Проверить оплату
    </Button>
  );
}
