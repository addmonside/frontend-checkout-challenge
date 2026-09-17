'use client';

import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/kit/toggle-group';
import { useState } from 'react';
import { Item, ItemContent, ItemTitle } from '@/shared/ui/kit/item';
import { GetCheckoutOptions200DataPaymentMethodsItem } from '@/shared/api/gen/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';

export function CheckoutPayment({
  paymentMethods,
}: {
  paymentMethods: GetCheckoutOptions200DataPaymentMethodsItem[] | undefined;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Способы оплаты</CardTitle>
      </CardHeader>
      <CardContent>
        {!!paymentMethods ? (
          <ToggleGroup value={selected} onValueChange={setSelected} variant="checkout">
            {paymentMethods.map((item) => (
              <ToggleGroupItem key={item.id} value={item.id}>
                <Item variant="checkout-toggle-item">
                  <ItemContent>
                    <ItemTitle>{item.title}</ItemTitle>
                  </ItemContent>
                </Item>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        ) : (
          'empty'
        )}
      </CardContent>
    </Card>
  );
}
