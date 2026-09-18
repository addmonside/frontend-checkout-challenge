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
      className={cn('max-w-7xl self-center px-6', className)}
      {...props}
    />
  );
}
