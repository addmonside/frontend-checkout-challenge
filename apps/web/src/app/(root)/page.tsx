import { ProductListBoundary } from '@/features/products/product-list-boundary';
import { ProductListSkeleton } from '@/features/products/product-list-skeleton';
import { PageLayout } from '@/shared/ui/page-layout';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Товары | Some Shop',
  description: 'Некоторые товары от некоторых людей',
};

export default function Home() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Товары</PageLayout.Title>
      </PageLayout.Header>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductListBoundary />
      </Suspense>
    </PageLayout>
  );
}
