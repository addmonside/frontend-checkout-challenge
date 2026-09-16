import { ClientCatalog } from '@/features/catalog/ui/client-catalog';
import { ServerCatalog } from '@/features/catalog/ui/server-catalog';

export default function Home() {
  return (
    <section>
      <header>I am page</header>
      <ClientCatalog />
      <ServerCatalog />
    </section>
  );
}
