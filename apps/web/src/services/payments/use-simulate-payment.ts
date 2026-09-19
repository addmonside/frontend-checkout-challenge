import {
  createSimulation as createSimulationApi,
  toApiError,
  useCreateSimulation as useCreateSimulationApi,
} from '@/shared/api';
import { CreateSimulationBodyScenario, GetSimulation200Data } from '@/shared/api/gen/model';
import { appConfig } from '@/shared/model';

export type PaymentScenario =
  (typeof CreateSimulationBodyScenario)[keyof typeof CreateSimulationBodyScenario];

export function useSimulatePayment() {
  const {
    mutateAsync,
    isPending,
    error: rawError,
  } = useCreateSimulationApi({
    mutation: {
      meta: { suppressErrorToast: true },
      mutationFn: (variables) => createSimulationApi(variables.paymentId, variables.data),
    },
  });

  const simulate = async (paymentId: string, scenario: PaymentScenario) => {
    const res = await mutateAsync({ paymentId, data: { scenario } });
    return {
      simulation: res.data as unknown as GetSimulation200Data,
      retryAfterMs: readRetryAfter(res.headers),
    };
  };

  return { simulate, isPending, error: toApiError(rawError) };
}

/** `Retry-After` приходит в секундах; при отсутствии заголовка опрашиваем раз в секунду. */
function readRetryAfter(headers: Headers | undefined): number {
  const seconds = Number(headers?.get('Retry-After'));
  return Number.isFinite(seconds) && seconds > 0
    ? seconds * 1000
    : appConfig.PAYMENT_RETRY_AFTER_MS;
}
