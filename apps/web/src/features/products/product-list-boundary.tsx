import { getServerToken } from '@/shared/api/token/token-storage.server';
import { ProductList } from './product-list';
import { PageLayout } from '@/shared/ui/page-layout';
import { LucideUser } from 'lucide-react';

export async function ProductListBoundary() {
  const token = (await getServerToken()) ?? '';

  return (
    <>
      {!token && (
        <PageLayout.Empty
          title="Авторизуйтесь"
          description="Для просмотра товаров авторизуйтесь"
          media={<LucideUser />}
        />
      )}
      <ProductList token={token} />
    </>
  );
}
