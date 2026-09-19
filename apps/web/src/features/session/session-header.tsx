import { LucidePackage2 } from 'lucide-react';
import Link from 'next/link';
import { Cart } from '@/services/cart';
import { routes } from '@/shared/model';
import { ButtonLink } from '@/shared/ui/button-link';
import { Logo } from '@/shared/ui/logo';
import { WidthBoundary } from '@/shared/ui/width-boundary';

export function SessionHeader() {
  return (
    <WidthBoundary
      as="header"
      className="flex h-20 items-center justify-between"
      data-slot="session-header"
    >
      <Link href={routes.HOME}>
        <Logo variant="header" />
      </Link>
      <div className="flex gap-3">
        <ButtonLink href={routes.ORDERS} variant="header-icon-ghost">
          <LucidePackage2 />
        </ButtonLink>
        <Cart />
      </div>
    </WidthBoundary>
  );
}
