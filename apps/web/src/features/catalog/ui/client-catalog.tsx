'use client';

import { useListProducts } from '@/shared/api/gen';

export function ClientCatalog() {
  const { data, isPending, isError } = useListProducts();

  return (
    <div>
      catalog
      {isPending && <p>Loading...</p>}
      {isError && <p>Error...</p>}
      {!isPending && data?.data instanceof Array && (
        <div>
          <ul>
            {data.data.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
