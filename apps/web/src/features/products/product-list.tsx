'use cache';

import { LucideShoppingBag } from 'lucide-react';
import { cacheLife } from 'next/cache';
import { fetchServer } from '@/shared/api/fetch/fetch-server';
import { ListProducts200 } from '@/shared/api/gen/model';
import { ItemGroup } from '@/shared/ui/kit/item';
import { PageLayout } from '@/shared/ui/page-layout';
import { ProductListItem } from './product-list-item';

export async function ProductList({ token }: { token: string }) {
  cacheLife('minutes');
  const data = await fetchServer<ListProducts200>('/api/products', {
    token,
    method: 'GET',
  });

  return !!data.data.length ? (
    <ItemGroup variant="product-list" as="ul">
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
    </ItemGroup>
  ) : (
    <PageLayout.Empty
      title="Нет доступных товаров"
      description="Но мы работаем над этим"
      media={<LucideShoppingBag />}
    />
  );
}
