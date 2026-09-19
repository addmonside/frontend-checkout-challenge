import { GetOrder200Data } from '@/shared/api/gen/model';

export type OrderPaymentAction =
  { kind: 'cash' } | { kind: 'paid' } | { kind: 'pending' } | { kind: 'pay'; retry: boolean };

/**
 * Определяет, какое действие доступно по оплате заказа.
 * Наличные и уже оплаченный заказ действий не требуют.
 */
export function getOrderPaymentAction(order: GetOrder200Data): OrderPaymentAction {
  if (order.paymentMethod === 'cash_on_delivery') return { kind: 'cash' };
  if (order.paymentStatus === 'succeeded') return { kind: 'paid' };
  if (order.paymentStatus === 'pending') return { kind: 'pending' };

  return {
    kind: 'pay',
    retry: order.paymentStatus === 'failed' || order.paymentStatus === 'cancelled',
  };
}
