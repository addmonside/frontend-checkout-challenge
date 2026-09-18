'use client';

import { ToggleGroupItem } from '@/shared/ui/kit/toggle-group';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/shared/ui/kit/item';
import { Price } from '@/shared/ui/price';

export function CheckoutDeliveryMethodItem({
  id,
  title,
  price,
  freeFrom,
}: {
  id: string;
  title: string;
  price: number;
  freeFrom: number | null;
}) {
  return (
    <ToggleGroupItem key={id} value={id}>
      <Item variant="checkout-toggle-item">
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>
            <Price value={price} />
            {freeFrom !== null && (
              <em>
                (Бесплатно при{' '}
                <b>
                  <Price value={freeFrom} />
                </b>
                )
              </em>
            )}
          </ItemDescription>
        </ItemContent>
      </Item>
    </ToggleGroupItem>
  );
}
