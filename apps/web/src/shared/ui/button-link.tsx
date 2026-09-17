import Link from 'next/link';
import type * as React from 'react';
import { cn } from 'cn';
import { type VariantProps } from 'class-variance-authority';
import { buttonClassName, buttonVariants } from './kit/button';
import { Spinner } from './kit/spinner';

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    isPending?: boolean;
    disabled?: boolean;
  };

function ButtonLink({
  className,
  variant = 'default',
  children,
  isPending,
  disabled,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      data-slot="button-link"
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      className={cn(
        buttonClassName({ variant, className, isPending }),
        disabled && 'pointer-events-none opacity-50',
      )}
      {...props}
    >
      {isPending ? <Spinner /> : children}
    </Link>
  );
}

export { ButtonLink };
export type { ButtonLinkProps };
