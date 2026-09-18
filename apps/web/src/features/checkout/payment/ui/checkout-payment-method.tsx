'use client';

import { useAtom } from 'jotai/react';
import { GetCheckoutOptions200DataPaymentMethodsItem } from '@/shared/api/gen/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { ToggleGroup } from '@/shared/ui/kit/toggle-group';
import { checkoutPaymentAtom } from '../model/checkout-payment-atom';
import { CheckoutPaymentMethodItem } from './checkout-payment-method-item';

export function CheckoutPaymentMethod({
  paymentMethods,
}: {
  paymentMethods: GetCheckoutOptions200DataPaymentMethodsItem[] | undefined;
}) {
  const [method, setMethod] = useAtom(checkoutPaymentAtom);

  const handleSelectMethod = (ids: string[]) => {
    const meth = paymentMethods?.find((m) => ids.includes(m.id));
    setMethod(meth?.id ?? undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Способы оплаты</CardTitle>
      </CardHeader>
      <CardContent>
        {!!paymentMethods ? (
          <ToggleGroup
            value={method ? [method] : []}
            onValueChange={handleSelectMethod}
            variant="checkout"
          >
            {paymentMethods.map((item) => (
              <CheckoutPaymentMethodItem key={item.id} id={item.id} title={item.title} />
            ))}
          </ToggleGroup>
        ) : (
          'empty'
        )}
      </CardContent>
    </Card>
  );
}
