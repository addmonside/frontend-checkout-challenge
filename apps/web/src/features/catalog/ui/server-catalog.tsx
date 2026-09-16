import { ListProducts200 } from '@/shared/api/gen/model';
import { fetchServer } from '@/shared/api/fetch/fetch-server';

export async function ServerCatalog() {
  const data = await fetchServer<ListProducts200>('/api/products', {
    method: 'GET',
  });

  return (
    <div>
      <ul>
        {data.data.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
