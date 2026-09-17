'use client';

import { useCart } from '../ model/use-cart';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/kit/sheet';
import { CartButton } from './cart-button';
import { CartEmpty } from './cart-empty';
import { CartContent } from './cart-content';

export function Cart() {
  const { items, quantity, subtotal, currency, isEmpty } = useCart();
  return (
    <Sheet>
      <SheetTrigger render={<CartButton quantity={quantity} />} />
      <SheetContent>
        {isEmpty ? (
          <CartEmpty />
        ) : (
          <CartContent items={items} subtotal={subtotal} currency={currency} />
        )}
      </SheetContent>
    </Sheet>
  );
}
