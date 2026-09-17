import { ItemGroup } from '@/shared/ui/kit/item';
import { Skeleton } from '@/shared/ui/kit/skeleton';
import { PageLayout } from '@/shared/ui/page-layout';

const LIMIT = 10;

export function ProductListSkeleton() {
  return (
    <PageLayout.Content>
      <ItemGroup as="ul" variant="product-list">
        {Array.from({ length: LIMIT }, (_, i) => (
          <Skeleton key={i} as="li" className="w-full h-70.25" />
        ))}
      </ItemGroup>
    </PageLayout.Content>
  );
}
