import { appConfig } from '@/shared/model';

export async function fetchBase(
  uri: string,
  token: string | null | undefined,
  options: RequestInit,
  apiUrl?: string,
): Promise<Response> {
  const url = `${apiUrl ?? appConfig.api.URL}${uri}`;
  const headers = {
    ...(options.body != null ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return await fetch(url, {
    ...options,
    headers,
  });
}
