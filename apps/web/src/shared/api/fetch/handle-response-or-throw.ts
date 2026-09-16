import { ApiError } from './api-error';
import type { ApiErrorBody } from './api-error-types';

export async function handleResponseOrThrow<T>(response: Response): Promise<T> {
  const text = await response.text(); // читаем body один раз, дальше — либо JSON.parse, либо undefined

  if (!response.ok) {
    const requestId = response.headers.get('X-Request-Id') ?? undefined;
    const body = safeParse<ApiErrorBody>(text);

    if (body?.error) {
      throw new ApiError(
        response.status,
        body.error.code,
        body.error.message,
        body.error.fields ?? [],
        requestId,
      );
    }

    // ! на случай, если ответ не в формате (например, 5xx от gateway/nginx)
    throw new ApiError(
      response.status,
      'UNKNOWN_ERROR',
      response.statusText || 'Request failed',
      [],
      requestId,
    );
  }

  return text ? JSON.parse(text) : (undefined as T);
}

function safeParse<T>(text: string): T | null {
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
