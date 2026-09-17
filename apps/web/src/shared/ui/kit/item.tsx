import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

import { Separator } from '@/shared/ui/kit/separator';

function ItemGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        'group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2',
        className,
      )}
      {...props}
    />
  );
}

function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn('my-2', className)}
      {...props}
    />
  );
}

const itemVariants = cva(
  'group/item text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted ',
  {
    variants: {
      variant: {
        default:
          'border-transparent flex w-full items-center rounded-lg border gap-2.5 px-3 py-2.5',
        'product-item': cn(
          'flex flex-col border-transparent bg-muted/10 gap-3 p-2 hover:bg-muted/40 rounded-2xl transition-colors items-stretch',
          '*:data-[slot=item-media]:flex *:data-[slot=item-media]:items-center *:data-[slot=item-media]:justify-center *:data-[slot=item-media]:h-36 *:data-[slot=item-media]:w-full *:data-[slot=item-media]:rounded-lg *:data-[slot=item-media]:bg-muted/50 *:data-[slot=item-media]:[&_svg]:size-12 *:data-[slot=item-media]:[&_svg]:text-muted-foreground',
          '*:data-[slot=item-footer]:min-h-8 ',
          '*:data-[slot=item-content]:basis-full',
        ),
        'cart-item': cn('flex items-center font-semibold'),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Item<T extends React.ElementType = 'section'>({
  className,
  variant = 'default',
  as,
  ...props
}: {
  as?: T;
} & Omit<React.ComponentProps<T>, 'as' | 'className'> &
  VariantProps<typeof itemVariants>) {
  const Component = as || 'section';
  return (
    <Component
      data-slot="item"
      data-variant={variant}
      className={cn(itemVariants({ variant, className: className as string }))}
      {...props}
    />
  );
}

const itemMediaVariants = cva(
  'flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "[&_svg:not([class*='size-'])]:size-4",
        image:
          'size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function ItemMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        'flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none',
        className,
      )}
      {...props}
    />
  );
}

function ItemTitle<T extends React.ElementType = 'p'>({
  className,
  as,
  ...props
}: {
  as?: T;
} & Omit<React.ComponentProps<T>, 'as'>) {
  const Component = as || 'p';
  return (
    <Component
      data-slot="item-title"
      className={cn(
        'line-clamp-1 w-fit text-sm leading-snug font-medium underline-offset-4',
        className,
      )}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        'line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
        className,
      )}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="item-actions" className={cn('flex items-center gap-2', className)} {...props} />
  );
}

function ItemHeader({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="item-header"
      className={cn('flex basis-full items-center justify-between gap-2', className)}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: React.ComponentProps<'footer'>) {
  return (
    <footer
      data-slot="item-footer"
      className={cn('flex items-center justify-between gap-2', className)}
      {...props}
    />
  );
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
