import { cn } from 'cn';

export function WidthBoundary<T extends React.ElementType = 'div'>({
  className,
  as,
  ...props
}: {
  as?: T;
} & Omit<React.ComponentProps<T>, 'as'>) {
  const Component = as || 'div';
  return (
    <Component
      data-slot="width-boundary"
      className={cn('px-6 max-w-7xl self-center', className)}
      {...props}
    />
  );
}
