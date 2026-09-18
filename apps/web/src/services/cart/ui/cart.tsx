'use client';

import { Button } from '@/shared/ui/kit/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/shared/ui/kit/sheet';
import { useCart } from '../ model/use-cart';
import { CartButton } from './cart-button';
import { CartContent } from './cart-content';
import { CartEmpty } from './cart-empty';

export function Cart() {
  const { items, quantity, subtotal, currency, isEmpty } = useCart();
  return (
    <Sheet>
      <SheetTrigger render={<CartButton quantity={quantity} />} />
      <SheetContent>
        {isEmpty ? (
          <CartEmpty
            renderAction={<SheetClose render={<Button variant="outline">Закрыть</Button>} />}
          />
        ) : (
          <CartContent items={items} subtotal={subtotal} currency={currency} />
        )}
      </SheetContent>
    </Sheet>
  );
}
