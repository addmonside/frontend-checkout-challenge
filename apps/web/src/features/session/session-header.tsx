import Link from 'next/link';
import { Cart } from '@/services/cart';
import { routes } from '@/shared/model';
import { Logo } from '@/shared/ui/logo';
import { WidthBoundary } from '@/shared/ui/width-boundary';

export function SessionHeader() {
  return (
    <WidthBoundary
      as="header"
      className="flex h-14 items-center justify-between"
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
