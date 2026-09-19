import {
  GetCheckoutOptions200DataDeliveryMethodsItem,
  GetOrder200Data,
} from '@/shared/api/gen/model';
import { OrderInfo, OrderInfoItem } from './order-info';

export function OrderDelivery({
  delivery,
  deliveryMethods,
}: {
  delivery: GetOrder200Data['delivery'];
  deliveryMethods?: GetCheckoutOptions200DataDeliveryMethodsItem[];
}) {
  if (delivery.method === 'courier') {
    const { city, street, house, apartment } = delivery.address;

    return (
      <OrderInfo>
        <OrderInfoItem label="Способ">Курьер</OrderInfoItem>
        <OrderInfoItem label="Адрес">
          {`г. ${city}, ул. ${street}, д. ${house}${apartment ? `, кв. ${apartment}` : ''}`}
        </OrderInfoItem>
      </OrderInfo>
    );
  }

  const pickupPoint = deliveryMethods
    ?.find((method) => method.id === 'pickup')
    ?.pickupPoints.find((point) => point.id === delivery.pickupPointId);

  return (
    <OrderInfo>
      <OrderInfoItem label="Способ">Самовывоз</OrderInfoItem>
      <OrderInfoItem label="Пункт выдачи">
        {pickupPoint ? (
          <span className="flex flex-col">
            <span>{pickupPoint.title}</span>
            <span className="text-muted-foreground font-normal">{pickupPoint.address}</span>
          </span>
        ) : (
          delivery.pickupPointId
        )}
      </OrderInfoItem>
    </OrderInfo>
  );
}
