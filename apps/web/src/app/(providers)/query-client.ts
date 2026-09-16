import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { ApiError } from '@/shared/api';
import { humanizeApiError } from '@/shared/model';

// todo: временная заглушка, пока нет ui !!!
const toast = {
  error: (message: string) => console.info('toast: ', message),
};

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

function reportError(
  error: unknown,
  meta?: { suppressErrorToast?: boolean; errorMessages?: Partial<Record<string, string>> },
) {
  if (meta?.suppressErrorToast) return;

  if (error instanceof ApiError) {
    toast.error(humanizeApiError(error, meta?.errorMessages));
    return;
  }

  toast.error('Проблема с сетью, попробуйте ещё раз');
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
