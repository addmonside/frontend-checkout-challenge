import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { Spinner } from './spinner';

const buttonVariants = cva(
  "group/button focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-clip-padding px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 active:scale-95 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:ring-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80 h-8',
        ghost: 'text-foreground bg-transparent hover:scale-105',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-8',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40 h-8',
        'header-icon-ghost':
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 size-12 h-8 [&_svg:not([class*='size-'])]:size-8",
        checkout: 'bg-primary text-primary-foreground hover:bg-primary/80 h-16 w-full text-2xl',
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
    isPending && 'pointer-events-none opacity-90',
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
