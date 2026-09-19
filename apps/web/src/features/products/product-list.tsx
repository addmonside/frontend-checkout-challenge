'use cache';

import { LucideShoppingBag } from 'lucide-react';
import { cacheLife } from 'next/cache';
import { fetchServer } from '@/shared/api/fetch/fetch-server';
import { ListProducts200 } from '@/shared/api/gen/model';
import { PageLayout } from '@/shared/ui/page-layout';
import { ProductListGrid } from './product-list-grid';

export async function ProductList({ token }: { token: string }) {
  cacheLife('minutes');
  const data = await fetchServer<ListProducts200>('/api/products', {
    token,
    method: 'GET',
  });

  return !!data.data.length ? (
    <ProductListGrid products={data.data} />
  ) : (
    <PageLayout.Empty
      title="Нет доступных товаров"
      description="Но мы работаем над этим"
      media={<LucideShoppingBag />}
    />
  );
}
