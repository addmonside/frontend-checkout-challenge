'use client';

import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { errorPageAtom } from '@/services/utility/errors/error-page-atom';
import { ApiError } from '@/shared/api';
import { routes } from '@/shared/model/routes';

export function useErrorPageRedirect() {
  const router = useRouter();
  const setError = useSetAtom(errorPageAtom);

  return useCallback(
    (error: Error) => {
      const id = error instanceof ApiError ? error.code : 'GENERAL_ERROR';
      setError(error);
      router.replace(routes.ERROR_PAGE.replace('[id]', id));
    },
    [router, setError],
  );
}
