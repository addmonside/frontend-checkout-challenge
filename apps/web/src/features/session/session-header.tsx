import { Logo } from '@/shared/ui/logo';
import { WidthBoundary } from '@/shared/ui/width-boundary';
import { Cart } from '@/services/cart';

export function SessionHeader() {
  return (
    <WidthBoundary
      as="header"
      className="h-14 flex items-center justify-between"
      data-slot="session-header"
    >
      <Logo variant="header" />
      <div>
        <Cart />
      </div>
    </WidthBoundary>
  );
}
