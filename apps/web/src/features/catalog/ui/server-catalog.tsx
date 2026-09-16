import { ListProducts200 } from '@/shared/api/gen/model';
import { serverFetch } from '@/shared/api/server-fetch';

export async function ServerCatalog() {
  const data = await serverFetch<ListProducts200>('/api/products', {
    method: 'GET',
  });

  console.log(data);
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
