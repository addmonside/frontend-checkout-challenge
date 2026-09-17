'use client';

import { Button } from '@/shared/ui/kit/button';
import { useAddToCart } from '../ model/use-add-to-cart';
import { useCartItem } from '../ model/use-cart-item';
import { useRemoveFromCart } from '../ model/use-remove-from-cart';
import { QuantityButton } from '@/shared/ui/quantity-button';

export function CartAdditionButton({ productId, stock }: { productId: string; stock?: number }) {
  const { item, isPending } = useCartItem(productId);
  const { addToCart } = useAddToCart();
  const { removeCartItem } = useRemoveFromCart();

  const handleAdd = () => addToCart(productId, (item?.quantity ?? 0) + 1);
  const handleChange = (q: number) => addToCart(productId, q);
  const handleRemove = () => removeCartItem(productId);

  return !!item?.quantity ? (
    <QuantityButton
      value={item.quantity}
      maxValue={stock}
      isPendingChange={isPending}
      isPendingRemove={isPending}
      onChange={handleChange}
      onRemove={handleRemove}
    />
  ) : (
    <Button onClick={handleAdd} isPending={isPending} className="min-w-24">
      Добавить
    </Button>
  );
}
