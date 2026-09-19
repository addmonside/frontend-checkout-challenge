import { Skeleton } from '@/shared/ui/kit/skeleton';
import { PageLayout } from '@/shared/ui/page-layout';

export function PaymentSkeleton() {
  return (
    <PageLayout.Content variant="checkout">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-96 w-full" />
    </PageLayout.Content>
  );
}
