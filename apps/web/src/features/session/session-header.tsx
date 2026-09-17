import { Logo } from '@/shared/ui/logo';
import { WidthBoundary } from '@/shared/ui/width-boundary';
import { Cart } from '@/services/cart';
import { routes } from '@/shared/model';
import Link from 'next/link';

export function SessionHeader() {
  return (
    <WidthBoundary
      as="header"
      className="h-14 flex items-center justify-between"
      data-slot="session-header"
    >
      <Link href={routes.HOME}>
        <Logo variant="header" />
      </Link>
      <div>
        <Cart />
      </div>
    </WidthBoundary>
  );
}
