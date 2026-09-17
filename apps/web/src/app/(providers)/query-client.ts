import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { ApiError } from '@/shared/api';
import { humanizeApiError } from '@/shared/model';
import { toast } from '@/shared/ui/kit/toast';

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      suppressErrorToast?: boolean;
      errorMessages?: Partial<Record<string, string>>;
    };
    queryMeta: {
      suppressErrorToast?: boolean;
      errorMessages?: Partial<Record<string, string>>;
    };
  }
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          if (error instanceof ApiError && error.status < 500) return false;
          return failureCount < 2;
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => reportError(error, query.meta),
    }),
    mutationCache: new MutationCache({
      onError: (error, _vars, _ctx, mutation) => reportError(error, mutation.meta),
    }),
  });
}

function reportError(
  error: unknown,
  meta?: { suppressErrorToast?: boolean; errorMessages?: Partial<Record<string, string>> },
) {
  if (meta?.suppressErrorToast) return;

  if (error instanceof ApiError) {
    setError(humanizeApiError(error, meta?.errorMessages));
    return;
  }

  setError('Проблема с сетью, попробуйте ещё раз');
}

function setError(description: string) {
  toast.add({
    type: 'error',
    description,
    priority: 'high',
  });
}
