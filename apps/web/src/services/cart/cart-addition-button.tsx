'use client';

import { Button } from '@/shared/ui/kit/button';

export function CartAdditionButton({ productId }: { productId: string }) {
  const handleClick = () => {
    console.log(productId);
  };

  return <Button onClick={handleClick}>Добавить</Button>;
}
