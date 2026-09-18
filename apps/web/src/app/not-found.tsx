import { ErrorView } from '@/services/utility/errors/error-view';
import { PageLayout } from '@/shared/ui/page-layout';

export default function NotFoundRoute() {
  return (
    <PageLayout>
      <PageLayout.Content variant="centered" data-slot="not-found">
        <ErrorView id="404" />
      </PageLayout.Content>
    </PageLayout>
  );
}
