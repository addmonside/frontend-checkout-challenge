import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from '@/shared/ui/kit/item';
import { Price } from '@/shared/ui/price';
import { CartAdditionButton } from './cart-addition-button';

export function CartListItem({
  productId,
  title,
  lineTotal,
  currency,
  stock,
}: {
  productId: string;
  title: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  currency: string;
  stock: number;
}) {
  return (
    <Item variant="cart-item" as="li">
      <ItemContent>
        <ItemTitle as="h3">{title}</ItemTitle>
        <ItemDescription>
          <Price value={lineTotal} currency={currency} />
        </ItemDescription>
      </ItemContent>
      <ItemFooter>
        <ItemActions>
          <CartAdditionButton productId={productId} stock={stock} />
        </ItemActions>
      </ItemFooter>
    </Item>
  );
}
