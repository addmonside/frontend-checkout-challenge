import { LucideUser } from 'lucide-react';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductList, ProductListSkeleton } from '@/features/products';
import { getServerToken } from '@/shared/api/token/token-storage.server';
import { PageLayout } from '@/shared/ui/page-layout';

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

export async function ProductListBoundary() {
  const token = (await getServerToken()) ?? '';

  return (
    <>
      {!token ? (
        <PageLayout.Empty
          title="Авторизуйтесь"
          description="Для просмотра товаров авторизуйтесь"
          media={<LucideUser />}
        />
      ) : (
        <PageLayout.Content>
          <ProductList token={token} />
        </PageLayout.Content>
      )}
    </>
  );
}
