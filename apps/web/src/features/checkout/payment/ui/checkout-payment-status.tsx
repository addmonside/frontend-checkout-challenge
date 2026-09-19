import { LucideClock } from 'lucide-react';
import { useCountdown } from '@/shared/lib';
import { appConfig, routes } from '@/shared/model';
import { ButtonLink } from '@/shared/ui/button-link';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/shared/ui/kit/alert';
import { PageLayout } from '@/shared/ui/page-layout';
import { Timer } from '@/shared/ui/timer';

export function CheckoutPaymentStatus({ expiresAt }: { expiresAt: string }) {
  const { remainingMs, isExpired } = useCountdown(expiresAt);

  if (remainingMs > appConfig.DISPLAY_QUOTE_WARNING_AFTER_MS) return null;

  return (
    <PageLayout.Content>
      <Alert variant={isExpired ? 'destructive' : 'default'}>
        <LucideClock />
        <AlertTitle>
          {isExpired ? (
            'Расчёт устарел'
          ) : (
            <>
              Расчёт устареет через <Timer expiresAt={expiresAt} format="short" />
            </>
          )}
        </AlertTitle>
        <AlertDescription>
          {isExpired
            ? 'Рассчитайте доставку заново, чтобы создать заказ.'
            : 'Время подтверждения заказа ограничено, не затягивайте.'}
        </AlertDescription>
        <AlertAction>
          <ButtonLink href={routes.CHECKOUT} variant="outline" className="h-7">
            Рассчитать заново
          </ButtonLink>
        </AlertAction>
      </Alert>
    </PageLayout.Content>
  );
}
