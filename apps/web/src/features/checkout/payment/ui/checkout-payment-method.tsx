'use client';

import { GetCheckoutOptions200DataPaymentMethodsItem } from '@/shared/api/gen/model';
import { CreateOrderBody } from '@/shared/api/gen/model/createOrderBody';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { FieldError } from '@/shared/ui/kit/field';
import { ToggleGroup } from '@/shared/ui/kit/toggle-group';
import { CheckoutPaymentMethodItem } from './checkout-payment-method-item';

export function CheckoutPaymentMethod({
  paymentMethods,
  value,
  onChange,
  error,
}: {
  paymentMethods: GetCheckoutOptions200DataPaymentMethodsItem[] | undefined;
  value: CreateOrderBody['paymentMethod'] | undefined;
  onChange: (value: CreateOrderBody['paymentMethod'] | undefined) => void;
  error?: string;
}) {
  const handleSelectMethod = (ids: string[]) => {
    const method = paymentMethods?.find((item) => ids.includes(item.id));
    onChange((method?.id as CreateOrderBody['paymentMethod'] | undefined) ?? undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Способы оплаты</CardTitle>
      </CardHeader>
      <CardContent>
        {!!paymentMethods ? (
          <ToggleGroup
            value={value ? [value] : []}
            onValueChange={handleSelectMethod}
            variant="checkout"
            hasError={!!error}
          >
            {paymentMethods.map((item) => (
              <CheckoutPaymentMethodItem key={item.id} id={item.id} title={item.title} />
            ))}
          </ToggleGroup>
        ) : (
          'empty'
        )}
        {error && <FieldError>{error}</FieldError>}
      </CardContent>
    </Card>
  );
}
