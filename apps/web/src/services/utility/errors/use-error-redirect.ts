'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useErrorPageRedirect } from '@/services/utility/errors/use-error-page-redirect';
import { ApiError } from '@/shared/api';

type ErrorRedirectOptions = {
  /** куда редиректить при устаревших данных (isStaleData); без него stale-ветка не срабатывает */
  staleTo?: string;
};

/**
 * Реагирует на ошибку запроса редиректом и возвращает флаг isRedirected,
 * чтобы компонент не успел моргнуть контентом до редиректа.
 *
 * Приоритет: 404 -> страница ошибки, затем isStaleData -> staleTo.
 */
export function useErrorRedirect(
  error: ApiError | undefined,
  options: ErrorRedirectOptions = {},
): boolean {
  const router = useRouter();
  const goToErrorPage = useErrorPageRedirect();
  const staleTo = options.staleTo;

  const isNotFound = error?.status === 404;
  const isStale = !!staleTo && !!error?.isStaleData && !isNotFound;

  useEffect(() => {
    if (isNotFound) {
      goToErrorPage(error);
      return;
    }
    if (isStale) {
      router.replace(staleTo);
      return;
    }
  }, [goToErrorPage, isNotFound, isStale, error, router, staleTo]);

  return isNotFound || isStale;
}
