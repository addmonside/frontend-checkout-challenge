'use client';

import { Item, ItemContent, ItemTitle } from '@/shared/ui/kit/item';
import { ToggleGroupItem } from '@/shared/ui/kit/toggle-group';

export function CheckoutPaymentMethodItem({ id, title }: { id: string; title: string }) {
  return (
    <ToggleGroupItem key={id} value={id}>
      <Item variant="checkout-toggle-item">
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
        </ItemContent>
      </Item>
    </ToggleGroupItem>
  );
}
