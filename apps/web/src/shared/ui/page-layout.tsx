import { cn } from 'cn';
import { Alert, AlertAction, AlertDescription, AlertTitle } from './kit/alert';
import { WidthBoundary } from './width-boundary';
import { LucideInfo } from 'lucide-react';
import { cva, VariantProps } from 'class-variance-authority';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './kit/empty';
import { ReactNode } from 'react';
import { ApiError } from '@/shared/api';
import { humanizeErrorPresentation } from '@/shared/model';

function PageLayoutWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <WidthBoundary
      as="section"
      className={cn('@container/page-layout flex w-full flex-1 flex-col pb-15 ', className)}
      data-slot="page-layout"
    >
      {children}
    </WidthBoundary>
  );
}

const PageLayoutTitle = ({
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      data-slot="page-layout-title"
      className={cn('relative flex flex-row text-2xl', className)}
      {...props}
    />
  );
};

function PageLayoutHeader({ className, ...props }: React.ComponentProps<'header'> & {}) {
  return (
    <header
      data-slot="page-layout-header"
      className={cn(
        'bg-background sticky top-0 z-10 flex flex-col gap-8 justify-center h-14 pb-1',
        className,
      )}
      {...props}
    />
  );
}

const pageLayoutContentVariants = cva('', {
  variants: {
    variant: {
      default: 'flex flex-col gap-12',
      centered: 'flex flex-col gap-12 items-center justify-center flex-1',
      checkout: 'grid md:grid-cols-[4fr_5fr] gap-12',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function PageLayoutContent<T extends React.ElementType = 'div'>({
  className,
  variant = 'default',
  as,
  ...props
}: {
  as?: T;
} & Omit<React.ComponentProps<T>, 'as'> &
  VariantProps<typeof pageLayoutContentVariants>) {
  const Component = as || 'div';
  return (
    <Component
      data-slot="page-layout-content"
      className={cn(pageLayoutContentVariants({ variant }), className)}
      {...props}
    />
  );
}

function PageLayoutError({
  error,
  media,
  action,
}: {
  error: { message: string } | null | undefined;
  media?: ReactNode;
  action?: ReactNode;
}) {
  if (!error) return null;

  const presentation =
    error instanceof ApiError ? humanizeErrorPresentation(error) : { description: error.message };

  return (
    <Alert variant="destructive" data-slot="page-layout-error">
      {media ?? <LucideInfo />}
      {presentation.title && <AlertTitle>{presentation.title}</AlertTitle>}
      <AlertDescription>{presentation.description}</AlertDescription>
      {action && <AlertAction>{action}</AlertAction>}
    </Alert>
  );
}

function PageLayoutEmpty({
  title,
  description,
  media,
  content,
}: {
  title: string;
  description?: string;
  media?: ReactNode;
  content?: ReactNode;
}) {
  return (
    <PageLayoutContent variant="centered" data-slot="page-layout-empty">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">{media ?? <LucideInfo />}</EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
        {!!content && <EmptyContent>{content}</EmptyContent>}
      </Empty>
    </PageLayoutContent>
  );
}

export const PageLayout = Object.assign(PageLayoutWrapper, {
  Header: PageLayoutHeader,

  Title: PageLayoutTitle,
  Content: PageLayoutContent,
  Error: PageLayoutError,
  Empty: PageLayoutEmpty,
});
