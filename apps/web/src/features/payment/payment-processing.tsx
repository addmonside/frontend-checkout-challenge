'use client';

import { ApiError } from '@/shared/api';
import { humanizeApiError } from '@/shared/model';
import { Alert, AlertDescription } from '@/shared/ui/kit/alert';
import { Button } from '@/shared/ui/kit/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Spinner } from '@/shared/ui/kit/spinner';

export function PaymentProcessing({
  error,
  onRetryAction: onRetryAction,
}: {
  error?: ApiError;
  onRetryAction?: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{error ? 'Не удалось запустить оплату' : 'Обрабатываем оплату'}</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertDescription>{humanizeApiError(error)}</AlertDescription>
          </Alert>
        ) : (
          <>
            <Spinner />
            <span>Проверяем статус платежа, это займёт несколько секунд…</span>
          </>
        )}
      </CardContent>
      {onRetryAction && (
        <CardFooter>
          <Button type="button" variant="checkout" onClick={onRetryAction}>
            Повторить
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
