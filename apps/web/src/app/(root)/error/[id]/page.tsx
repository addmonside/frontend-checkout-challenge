import { Metadata } from 'next';
import { Suspense } from 'react';
import { errorTitle, ErrorView } from '@/services/utility/errors';
import { Skeleton } from '@/shared/ui/kit/skeleton';
import { PageLayout } from '@/shared/ui/page-layout';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return { title: `${errorTitle(id)} | Some Shop` };
}

export default function ErrorRoute({ params }: { params: Promise<{ id: string }> }) {
  return (
    <PageLayout>
      <Suspense
        fallback={
          <PageLayout.Content variant="centered" data-slot="error-page">
            <Skeleton className="h-40 w-full max-w-md" />
          </PageLayout.Content>
        }
      >
        <ErrorRouteBoundary params={params} />
      </Suspense>
    </PageLayout>
  );
}

async function ErrorRouteBoundary({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PageLayout.Content variant="centered" data-slot="error-page">
      <ErrorView id={id} />
    </PageLayout.Content>
  );
}
