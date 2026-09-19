'use client';

import { GetCheckoutOptions200DataDeliveryMethodsItemPickupPointsItem } from '@/shared/api/gen/model';
import { FieldError } from '@/shared/ui/kit/field';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/shared/ui/kit/item';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/kit/toggle-group';

export function CheckoutDeliveryAddressPickup({
  pickupPoints,
  value,
  onChangeAction,
  error,
}: {
  pickupPoints: GetCheckoutOptions200DataDeliveryMethodsItemPickupPointsItem[];
  value: string | undefined;
  onChangeAction: (value: string) => void;
  error?: string;
}) {
  const handleSelectPoint = (ids: string[]) => {
    onChangeAction(ids[0] ?? '');
  };

  return (
    <>
      <ToggleGroup
        value={value ? [value] : []}
        onValueChange={handleSelectPoint}
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
