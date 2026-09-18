'use client';

import { GetCart200DataItemsItem } from '@/shared/api/gen/model';
import { routes } from '@/shared/model';
import { ButtonLink } from '@/shared/ui/button-link';
import { Button } from '@/shared/ui/kit/button';
import {
  SheetClose,
  SheetContentContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/kit/sheet';
import { Price } from '@/shared/ui/price';
import { CartList } from './cart-list';

export function CartContent({
  items,
  subtotal,
  currency,
}: {
  items: GetCart200DataItemsItem[];
  subtotal: number;
  currency: string;
}) {
  return (
    <>
      <SheetHeader>
        <SheetTitle>Корзина</SheetTitle>
      </SheetHeader>
      <SheetContentContent>
        <CartList items={items} currency={currency} />
      </SheetContentContent>
      <SheetFooter>
        <p className="flex w-full justify-between">
          <em className="">Итого</em>
          <strong className="font-bold">
            <Price value={subtotal} currency={currency} />
          </strong>
        </p>
        <SheetClose
          nativeButton={false}
          render={<ButtonLink href={routes.CHECKOUT}>Перейти к оформлению</ButtonLink>}
        />
        <SheetClose render={<Button variant="outline">Закрыть</Button>} />
      </SheetFooter>
    </>
  );
}
