import { GetCart200DataItemsItem } from '@/shared/api/gen/model';
import { CartListItem } from './cart-list-item';
import { SheetContentContent } from '@/shared/ui/kit/sheet';

export function CartList({
  items,
  currency,
}: {
  items: GetCart200DataItemsItem[];
  currency: string;
}) {
  return (
    <SheetContentContent as="ul" className="flex flex-col gap-2">
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
    </SheetContentContent>
  );
}
