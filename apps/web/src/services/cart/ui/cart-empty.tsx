import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/kit/empty';
import { LucideShoppingBasket } from 'lucide-react';

export function CartEmpty({ renderAction }: { renderAction?: React.ReactNode }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <LucideShoppingBasket />
        </EmptyMedia>
        <EmptyTitle>Выша корзина пуста</EmptyTitle>
        <EmptyDescription>Добавьте товары, чтобы оформить заказ.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{renderAction}</EmptyContent>
    </Empty>
  );
}
