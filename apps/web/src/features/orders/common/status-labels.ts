import {
  ListOrders200DataItemPaymentMethod,
  ListOrders200DataItemPaymentStatus,
  ListOrders200DataItemStatus,
} from '@/shared/api/gen/model';

type OrderStatus = (typeof ListOrders200DataItemStatus)[keyof typeof ListOrders200DataItemStatus];
type PaymentStatus =
  (typeof ListOrders200DataItemPaymentStatus)[keyof typeof ListOrders200DataItemPaymentStatus];
type PaymentMethod =
  (typeof ListOrders200DataItemPaymentMethod)[keyof typeof ListOrders200DataItemPaymentMethod];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  awaiting_payment: 'Ожидает оплаты',
  paid: 'Оплачен',
  confirmed: 'Подтверждён',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  unpaid: 'Не оплачен',
  pending: 'Оплата обрабатывается',
  succeeded: 'Оплачен',
  failed: 'Оплата отклонена',
  cancelled: 'Оплата отменена',
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  card: 'Картой онлайн',
  cash_on_delivery: 'Наличными при получении',
};