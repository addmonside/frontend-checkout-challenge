import { ListProducts200DataItem } from '@/shared/api/gen/model';
import { ItemGroup } from '@/shared/ui/kit/item';
import { ProductListGridItem } from './product-list-grid-item';

export function ProductListGrid({ products }: { products: ListProducts200DataItem[] }) {
  return (
    <ItemGroup variant="product-list" as="ul">
      {products.map((product) => (
        <ProductListGridItem
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
  );
}
