import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { LucideShoppingBasket } from 'lucide-react';
import { capValue, cn } from '@/shared/lib';
import { Badge } from '@/shared/ui/kit/badge';
import { Button } from '@/shared/ui/kit/button';

export function CartButton({
  quantity,
  className,
  ...props
}: ButtonPrimitive.Props & { quantity: number }) {
  return (
    <Button variant="header-icon-ghost" className={cn('relative', className)} {...props}>
      <LucideShoppingBasket />
      {!!quantity && (
        <Badge className="absolute -top-0.5 -right-2.5 size-6.5">{capValue(quantity, 9)}</Badge>
      )}
    </Button>
  );
}
