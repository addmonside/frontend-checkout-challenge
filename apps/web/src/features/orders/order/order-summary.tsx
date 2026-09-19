import { CheckoutInfo } from '@/features/checkout/common/checkout-info';
import {
  GetCheckoutOptions200DataDeliveryMethodsItem,
  GetOrder200Data,
} from '@/shared/api/gen/model';
import { DateTime } from '@/shared/ui/date';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/card';
import { Separator } from '@/shared/ui/kit/separator';
import { PAYMENT_METHOD_LABELS, PAYMENT_STATUS_LABELS } from '../common/status-labels';
import { OrderActions } from './order-actions';
import { OrderDelivery } from './order-delivery';
import { OrderInfo, OrderInfoItem } from './order-info';
import { OrderStatusBadge } from './order-status-badge';

export function OrderSummary({
  order,
  deliveryMethods,
  onPay,
  onRefresh,
}: {
  order: GetOrder200Data;
  deliveryMethods?: GetCheckoutOptions200DataDeliveryMethodsItem[];
  onPay?: () => void;
  onRefresh?: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Заказ №{order.number}</CardTitle>
        <CardDescription>
          <DateTime value={order.createdAt} />
        </CardDescription>
        <CardAction>
          <OrderStatusBadge status={order.status} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <OrderInfo>
          <OrderInfoItem label="Способ оплаты">
            {PAYMENT_METHOD_LABELS[order.paymentMethod]}
          </OrderInfoItem>
          <OrderInfoItem label="Статус оплаты">
            {PAYMENT_STATUS_LABELS[order.paymentStatus]}
          </OrderInfoItem>
        </OrderInfo>
        <Separator />
        <CardTitle>Покупатель</CardTitle>
        <OrderInfo>
          <OrderInfoItem label="Имя">{order.customer.name}</OrderInfoItem>
          <OrderInfoItem label="Телефон">{order.customer.phone}</OrderInfoItem>
          <OrderInfoItem label="Почта">{order.customer.email}</OrderInfoItem>
        </OrderInfo>
        <Separator />
        <CardTitle>Доставка</CardTitle>
        <OrderDelivery delivery={order.delivery} deliveryMethods={deliveryMethods} />
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4">
        <CheckoutInfo
          subtotal={order.subtotal}
          currency={order.currency}
          shipping={order.shipping}
          total={order.total}
        />
        <OrderActions order={order} onPay={onPay} onRefresh={onRefresh} />
      </CardFooter>
    </Card>
  );
}
