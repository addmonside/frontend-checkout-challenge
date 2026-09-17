'use cache';

import { fetchServer } from '@/shared/api/fetch/fetch-server';
import { ListProducts200 } from '@/shared/api/gen/model';
import { PageLayout } from '@/shared/ui/page-layout';
import { cacheLife } from 'next/cache';
import { ProductListItem } from './product-list-item';
import { LucideShoppingBag } from 'lucide-react';

export async function ProductList({ token }: { token: string }) {
  cacheLife('minutes');
  const data = await fetchServer<ListProducts200>('/api/products', {
    token,
    method: 'GET',
  });

  return !!data.data.length ? (
    <PageLayout.Content as="ul" variant="grid">
      {data.data.map((product) => (
        <ProductListItem
          key={product.id}
          productId={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          stock={product.stock}
          currency={product.currency}
        />
      ))}
    </PageLayout.Content>
  ) : (
    <PageLayout.Empty
      title="Нет доступных товаров"
      description="Но мы работаем над этим"
      media={<LucideShoppingBag />}
    />
  );
}
