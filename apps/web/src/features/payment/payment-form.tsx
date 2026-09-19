'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PaymentScenario } from '@/services/payments';
import {
  GetOrder200Data,
  GetPayment200Data,
  GetSandbox200DataCardsItem,
} from '@/shared/api/gen/model';
import { routes } from '@/shared/model';
import { Button } from '@/shared/ui/kit/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/card';
import { Field } from '@/shared/ui/kit/field';
import { Price } from '@/shared/ui/price';
import { PaymentCardList } from './payment-card-list';

export function PaymentForm({
  payment,
  order,
  isPending,
  onSubmitAction,
}: {
  payment: GetPayment200Data | undefined;
  order: GetOrder200Data;
  isPending: boolean;
  onSubmitAction: (scenario: PaymentScenario) => void;
}) {
  const router = useRouter();
  const [card, setCard] = useState<GetSandbox200DataCardsItem | undefined>();
  const d = data.get(payment?.status ?? 'pending') ?? data.get('pending')!;
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (card) onSubmitAction(card.scenario);
  };

  return (
    <Card as="form" noValidate onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>{d.title}</CardTitle>
        {d.description && <CardDescription>{d.description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <PaymentCardList onChangeAction={setCard} />
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4">
        <Field>
          <div className="flex items-center justify-between font-semibold">
            <span>К оплате</span>
            <Price value={order.total} currency={order.currency} />
          </div>
          <Button type="submit" variant="checkout" isPending={isPending} disabled={!card}>
            {d.submitButtonTitle}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => router.push(routes.order(order.id))}
          >
            {d.cancelButtonTitle}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

const data = new Map<
  GetPayment200Data['status'],
  { title: string; description?: string; submitButtonTitle: string; cancelButtonTitle: string }
>([
  [
    'failed',
    {
      title: 'Оплата не прошла',
      description: 'Банк отклонил платёж. Выберите другую карту и попробуйте снова.',
      submitButtonTitle: 'Оплатить снова',
      cancelButtonTitle: 'К заказу',
    },
  ],
  [
    'pending',
    {
      title: 'Оплата ожидает',
      description: 'Оплата еще не была завершена. Пожалуйста, подождите.',
      submitButtonTitle: 'Оплатить',
      cancelButtonTitle: 'Отменить',
    },
  ],
  [
    'cancelled',
    {
      title: 'Оплата отменена',
      description: 'Оплата отменена. Заказ сохранён, его можно оплатить снова.',
      submitButtonTitle: 'Оплатить',
      cancelButtonTitle: 'К заказу',
    },
  ],
]);
