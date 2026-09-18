import { cn } from 'cn';

export function Skeleton<T extends React.ElementType = 'div'>({
  className,
  as,
  ...props
}: {
  as?: T;
} & Omit<React.ComponentProps<T>, 'as'>) {
  const Component = as || 'div';
  return (
    <Component
      data-slot="skeleton"
      className={cn('bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  );
}
