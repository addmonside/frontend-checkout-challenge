import { GetCart200DataItemsItem } from '@/shared/api/gen/model';
import { CartListItem } from './cart-list-item';
import { ItemGroup } from '@/shared/ui/kit/item';

export function CartList({
  items,
  currency,
}: {
  items: GetCart200DataItemsItem[];
  currency: string;
}) {
  return (
    <ItemGroup as="ul" variant="cart-list">
      {items.map((item) => (
        <CartListItem
          key={item.productId}
          productId={item.productId}
          title={item.title}
          unitPrice={item.unitPrice}
          quantity={item.quantity}
          lineTotal={item.lineTotal}
          currency={currency}
          stock={item.stock}
        />
      ))}
    </ItemGroup>
  );
}
