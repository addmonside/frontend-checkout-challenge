'use client';

import { ToggleGroupItem } from '@/shared/ui/kit/toggle-group';
import { Item, ItemContent, ItemTitle } from '@/shared/ui/kit/item';

export function CheckoutPaymentItem({ id, title }: { id: string; title: string }) {
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
