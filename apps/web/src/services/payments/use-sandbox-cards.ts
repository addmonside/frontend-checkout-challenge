import { toApiError, useGetSandbox } from '@/shared/api';
import { GetSandbox200Data } from '@/shared/api/gen/model';

export function useSandboxCards() {
  const { data, isPending, error } = useGetSandbox();

  const sandbox =
    typeof data?.data === 'object' && 'cards' in data.data
      ? (data.data as unknown as GetSandbox200Data)
      : undefined;

  return { cards: sandbox?.cards ?? [], isPending, error: toApiError(error) };
}
