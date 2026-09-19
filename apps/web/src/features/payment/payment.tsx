'use client';

import { CartList } from '@/services/cart';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { PageLayout } from '@/shared/ui/page-layout';
import { PaymentForm } from './payment-form';
import { PaymentProcessing } from './payment-processing';
import { PaymentSkeleton } from './payment-skeleton';
import { useOrderPayment } from './use-order-payment';

export function Payment({ orderId }: { orderId: string }) {
  const {
    order,
    isOrderPending,
    orderError,
    payment,
    isProcessing,
    submit,
    retrySubmit,
    submitError,
  } = useOrderPayment(orderId);

  if (isOrderPending) return <PaymentSkeleton />;

  return (
    <>
      <PageLayout.Error error={orderError} />
      {order && (
        <PageLayout.Content variant="checkout">
          <Card>
            <CardHeader>
              <CardTitle>Товары</CardTitle>
            </CardHeader>
            <CardContent>
              <CartList items={order.items} currency={order.currency} hiddenActions />
            </CardContent>
          </Card>
          <div className="sticky top-0 z-20 h-fit flex-1">
            {isProcessing ? (
              <PaymentProcessing error={submitError} onRetryAction={retrySubmit} />
            ) : (
              <PaymentForm
                payment={payment}
                order={order}
                isPending={isProcessing}
                onSubmitAction={submit}
              />
            )}
          </div>
        </PageLayout.Content>
      )}
    </>
  );
}
