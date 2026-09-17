import { Button } from '@/shared/ui/kit/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/kit/empty';
import { SheetClose } from '@/shared/ui/kit/sheet';
import { LucideShoppingBasket } from 'lucide-react';

export function CartEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <LucideShoppingBasket />
        </EmptyMedia>
        <EmptyTitle>Выша корзина пуста</EmptyTitle>
        <EmptyDescription>Добавьте товары, чтобы оформить заказ.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <SheetClose render={<Button variant="outline">Закрыть</Button>} />
      </EmptyContent>
    </Empty>
  );
}
