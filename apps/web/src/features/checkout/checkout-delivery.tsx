'use client';

import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/kit/toggle-group';
import { useState } from 'react';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/shared/ui/kit/item';
import { Price } from '@/shared/ui/price';
import { GetCheckoutOptions200DataDeliveryMethodsItem } from '@/shared/api/gen/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';

export function CheckoutDelivery({
  deliveryMethods,
}: {
  deliveryMethods: GetCheckoutOptions200DataDeliveryMethodsItem[] | undefined;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Способы доставки</CardTitle>
      </CardHeader>
      <CardContent>
        {!!deliveryMethods ? (
          <ToggleGroup value={selected} onValueChange={setSelected} variant="checkout">
            {deliveryMethods.map((item) => (
              <ToggleGroupItem key={item.id} value={item.id}>
                <Item variant="checkout-toggle-item">
                  <ItemContent>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemDescription>
                      <Price value={item.price} />
                      {item.freeFrom !== null && (
                        <em>
                          (Бесплатно при{' '}
                          <b>
                            <Price value={item.freeFrom} />
                          </b>
                          )
                        </em>
                      )}
                    </ItemDescription>
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
