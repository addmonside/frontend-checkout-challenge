import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { Spinner } from './spinner';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        'header-icon-ghost':
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50  size-12 [&_svg:not([class*='size-'])]:size-8",
        clear: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function buttonClassName({
  variant,
  className,
  isPending,
}: VariantProps<typeof buttonVariants> & {
  className?: ButtonPrimitive.Props['className'];
  isPending?: boolean;
}) {
  const resolvedClassName = typeof className === 'function' ? undefined : className;
  return cn(
    buttonVariants({ variant, className: resolvedClassName }),
    isPending && 'opacity-90 pointer-events-none',
  );
}

function Button({
  className,
  variant = 'default',
  children,
  isPending,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & { isPending?: boolean }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={buttonClassName({ variant, className, isPending })}
      {...props}
    >
      {isPending ? <Spinner /> : children}
    </ButtonPrimitive>
  );
}

export { Button, buttonClassName, buttonVariants };
