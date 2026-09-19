'use client';

import { GetCheckoutOptions200DataDeliveryMethodsItem } from '@/shared/api/gen/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { FieldError } from '@/shared/ui/kit/field';
import { ToggleGroup } from '@/shared/ui/kit/toggle-group';
import { CheckoutDeliveryMethodItem } from './checkout-delivery-method-item';

export function CheckoutDeliveryMethod({
  deliveryMethods,
  value,
  onChangeAction,
  error,
}: {
  deliveryMethods: GetCheckoutOptions200DataDeliveryMethodsItem[];
  value: string | undefined;
  onChangeAction: (value: string) => void;
  error?: string;
}) {
  const handleSelectMethod = (ids: string[]) => {
    const method = deliveryMethods.find((item) => ids.includes(item.id));
    onChangeAction(method?.id ?? '');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Способы доставки</CardTitle>
      </CardHeader>
      <CardContent>
        <ToggleGroup
          value={value ? [value] : []}
          onValueChange={handleSelectMethod}
          variant="checkout"
          hasError={!!error}
        >
          {deliveryMethods.map((item) => (
            <CheckoutDeliveryMethodItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              freeFrom={item.freeFrom}
            />
          ))}
        </ToggleGroup>
        {error && <FieldError>{error}</FieldError>}
      </CardContent>
    </Card>
  );
}
