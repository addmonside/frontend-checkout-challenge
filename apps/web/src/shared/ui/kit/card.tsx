import { cn } from 'cn';
import * as React from 'react';

function Card<T extends React.ElementType = 'div'>({
  className,
  size = 'default',
  as,
  ...props
}: {
  as?: T;
} & Omit<React.ComponentProps<T>, 'as'> & { size?: 'default' | 'sm' }) {
  const Component = as || 'div';
  return (
    <Component
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card bg-card text-card-foreground flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl py-(--card-spacing) text-sm [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-description]:grid-rows-[auto_auto] sm:has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'self-start sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent<T extends React.ElementType = 'div'>({
  className,
  as,
  ...props
}: {
  as?: T;
} & Omit<React.ComponentProps<T>, 'as'>) {
  const Component = as ?? 'div';
  return (
    <Component
      data-slot="card-content"
      className={cn('grid gap-2.5 px-(--card-spacing)', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'bg-muted/50 flex items-center rounded-xl border-t p-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
