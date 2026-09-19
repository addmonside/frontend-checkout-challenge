'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useOrder } from '@/services/orders';
import {
  invalidateOrderPayments,
  isPaymentFinal,
  PaymentScenario,
  useCreatePayment,
  usePayments,
  usePaymentStatus,
  useSimulatePayment,
} from '@/services/payments';
import { appConfig, routes } from '@/shared/model';

export function useOrderPayment(orderId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    order,
    isPending: isOrderPending,
    error: orderError,
  } = useOrder(orderId, {
    refetchOnMount: 'always',
    staleTime: 0,
  });

  const { payments } = usePayments(orderId);
  const activePayment = payments.find(
    (payment) => payment.status === 'pending' || payment.status === 'processing',
  );

  // Активную попытку восстанавливаем из списка после перезагрузки страницы.
  const [createdPaymentId, setCreatedPaymentId] = useState<string>();
  const [retryAfterMs, setRetryAfterMs] = useState<number>(appConfig.PAYMENT_RETRY_AFTER_MS);
  const [scenario, setScenario] = useState<PaymentScenario>();
  const paymentId = createdPaymentId ?? activePayment?.id;

  const { payment } = usePaymentStatus(paymentId, retryAfterMs);
  const {
    createPayment,
    renewKey,
    isPending: isCreating,
    error: createError,
  } = useCreatePayment(orderId);
  const { simulate, isPending: isSimulating, error: simulateError } = useSimulatePayment();

  const submit = useCallback(
    async (scenario: PaymentScenario) => {
      setScenario(scenario);
      try {
        // Новая попытка (первая или после отказа/отмены) получает новый ключ.
        // Повтор во время обработки переиспользует прежний ключ, чтобы не создать дубль.
        if (isPaymentFinal(payment?.status) || !paymentId) renewKey();
        const created = await createPayment();
        setCreatedPaymentId(created.id);
        const result = await simulate(created.id, scenario);
        setRetryAfterMs(result.retryAfterMs);
      } catch {
        // ошибка уже доступна через createError/simulateError
      }
    },
    [payment, paymentId, renewKey, createPayment, simulate],
  );

  // Финальный статус: источник истины — заказ. Обновляем и заказ, и список попыток,
  // чтобы завершённая попытка не считалась активной.
  useEffect(() => {
    if (isPaymentFinal(payment?.status)) invalidateOrderPayments(queryClient, orderId);
  }, [payment?.status, queryClient, orderId]);

  // Показываем успех только по подтверждённому сервером заказу.
  useEffect(() => {
    if (!order) return;
    const isCash = order.paymentMethod !== 'card';
    const isPaid = order.status === 'paid' && order.paymentStatus === 'succeeded';
    if (isCash || isPaid) router.replace(routes.order(orderId));
  }, [order, router, orderId]);

  /** Повтор имитации на той же попытке: сценарий ещё не зафиксирован. */
  const retrySimulation = useCallback(() => {
    if (!paymentId || !scenario) return;
    void simulate(paymentId, scenario).catch(() => {});
  }, [paymentId, scenario, simulate]);

  const isFinished = payment?.status === 'failed' || payment?.status === 'cancelled';
  const isProcessing =
    !isFinished &&
    (isCreating ||
      isSimulating ||
      (!!paymentId && !isPaymentFinal(payment?.status)) ||
      order?.paymentStatus === 'pending');

  return {
    order,
    isOrderPending,
    orderError,
    payment,
    isProcessing,
    isFinished,
    submit,
    retrySubmit:
      scenario && paymentId && !isPaymentFinal(payment?.status) ? retrySimulation : undefined,
    submitError: createError ?? simulateError,
  };
}
