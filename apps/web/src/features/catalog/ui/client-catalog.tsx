'use client';

import { useCreateOrder, useListProducts } from '@/shared/api/gen';
import { useLayoutEffect } from 'react';

export function ClientCatalog() {
  const { data, isPending, isError } = useListProducts();
  const { mutate } = useCreateOrder();

  useLayoutEffect(() => {
    mutate();
  }, [mutate]);

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
