'use client';

import { useSandboxCards } from '@/services/payments';
import { GetSandbox200DataCardsItem } from '@/shared/api/gen/model';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/shared/ui/kit/item';
import { Skeleton } from '@/shared/ui/kit/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/kit/toggle-group';

export function PaymentCardList({
  onChangeAction,
}: {
  onChangeAction: (v: GetSandbox200DataCardsItem | undefined) => void;
}) {
  const { cards, isPending: isCardsPending } = useSandboxCards();
  const handleChange = (ids: string[]) => onChangeAction(cards.find((card) => card.id === ids[0]));

  return isCardsPending ? (
    <div className="grid grid-cols-2 gap-2">
      <Skeleton className="h-17" />
      <Skeleton className="h-17" />
    </div>
  ) : (
    <ToggleGroup onValueChange={handleChange} variant="checkout">
      {cards.map((card) => (
        <ToggleGroupItem key={card.id} value={card.id}>
          <Item variant="checkout-toggle-item">
            <ItemContent>
              <ItemTitle>{card.title}</ItemTitle>
              <ItemDescription>{card.maskedNumber}</ItemDescription>
            </ItemContent>
          </Item>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
