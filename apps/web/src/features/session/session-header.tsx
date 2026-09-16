import { Logo } from '@/shared/ui/logo';
import { SessionBoundary } from './session-boundary';
import { Cart } from '@/services/cart';

export function SessionHeader() {
  return (
    <SessionBoundary
      as="header"
      className="h-14 flex items-center justify-between"
      data-slot="session-header"
    >
      <Logo variant="header" />
      <div>
        <Cart />
      </div>
    </SessionBoundary>
  );
}
