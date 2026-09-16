import { appConfig } from '@/shared/model';

export async function fetchBase(
  uri: string,
  token: string | null | undefined,
  options: RequestInit,
  apiUrl?: string,
): Promise<Response> {
  const url = `${apiUrl ?? appConfig.api.URL}${uri}`;
  const headers = token
    ? {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
        ...options.headers,
      };

  return await fetch(url, {
    ...options,
    headers,
  });
}
