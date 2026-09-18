'use client';

import { useAtom } from 'jotai/react';
import { GetCheckoutOptions200DataDeliveryMethodsItemPickupPointsItem } from '@/shared/api/gen/model';
import { FieldError } from '@/shared/ui/kit/field';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/shared/ui/kit/item';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/kit/toggle-group';
import { checkoutDeliveryAddressAtom } from '../model/checkout-delivery-atom';

export function CheckoutDeliveryAddressPickup({
  pickupPoints,
  error,
}: {
  pickupPoints: GetCheckoutOptions200DataDeliveryMethodsItemPickupPointsItem[];
  error?: string;
}) {
  const [address, setAddress] = useAtom(checkoutDeliveryAddressAtom);

  const selectedPickupPointId =
    address && 'pickupPointId' in address ? address.pickupPointId : undefined;

  const handleSelectMethod = (value: string[]) => {
    const point = pickupPoints.find((item) => item.id === value[0]);
    setAddress(point ? { pickupPointId: point.id as 'point-center' | 'point-north' } : undefined);
  };

  return (
    <>
      <ToggleGroup
        value={selectedPickupPointId ? [selectedPickupPointId] : []}
        onValueChange={handleSelectMethod}
        variant="checkout"
        hasError={!!error}
      >
        {pickupPoints.map((point) => (
          <ToggleGroupItem key={point.id} value={point.id}>
            <Item variant="checkout-toggle-item">
              <ItemContent>
                <ItemTitle>{point.title}</ItemTitle>
                <ItemDescription>{point.address}</ItemDescription>
              </ItemContent>
            </Item>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {error && <FieldError>{error}</FieldError>}
    </>
  );
}
