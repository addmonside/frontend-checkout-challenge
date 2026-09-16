import { CartAdditionButton } from '@/services/cart';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from '@/shared/ui/kit/item';
import { Price } from '@/shared/ui/price';
import { LucideShoppingBag } from 'lucide-react';

export function ProductListItem({
  id,
  title,
  description,
  price,
  stock,
  currency,
}: {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  currency: string;
}) {
  return (
    <Item variant="product">
      <ItemMedia className="">
        <LucideShoppingBag className="text-muted-foreground" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle as="h3">{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemFooter>
        {stock > 0 ? (
          <>
            <Price value={price} currency={currency} />
            <ItemActions>
              <CartAdditionButton productId={id} />
            </ItemActions>
          </>
        ) : (
          <p className="w-full text-center">Нет в наличии</p>
        )}
      </ItemFooter>
    </Item>
  );
}
