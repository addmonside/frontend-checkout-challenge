import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/shared/ui/kit/alert';
import { Button } from '@/shared/ui/kit/button';
import { useCountdown } from '@/shared/lib';
import { LucideClock } from 'lucide-react';
import { Timer } from '@/shared/ui/timer';
import { appConfig } from '@/shared/model';

export function CheckoutPaymentStatus({
  expiresAt,
  onRecalculate,
}: {
  expiresAt: string;
  onRecalculate: () => void;
}) {
  const { remainingMinutes, isExpired } = useCountdown(expiresAt);

  if (remainingMinutes > appConfig.QUOTE_WARNING_MINUTES) return null;

  return (
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
        <Button variant="outline" className="h-7" onClick={onRecalculate}>
          Рассчитать заново
        </Button>
      </AlertAction>
    </Alert>
  );
}
