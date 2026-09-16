import { cva, VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { LucideBarcode } from 'lucide-react';

const logoVariants = cva('flex items-center gap-2', {
  variants: {
    variant: {
      default: 'bg-card text-card-foreground',
      footer: '*:[p]:text-md *:[svg]:size-5  *:[p]:font-semibold',
      header: '*:[p]:text-2xl *:[svg]:size-8  *:[p]:font-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export function Logo({
  className,
  variant,
}: { className?: string } & VariantProps<typeof logoVariants>) {
  return (
    <div
      className={cn('flex items-center gap-2', logoVariants({ variant }), className)}
      data-slot="logo"
    >
      <LucideBarcode />
      <p>Some Shop</p>
    </div>
  );
}
