import { appConfig } from '@/shared/model';
import { token } from './token';

export async function customFetch<T>(url: string, options: RequestInit): Promise<T> {
  const response = await doFetch(url, options);

  if (response.status === 401) {
    token.clear();
    const retryResponse = await doFetch(url, options);

    if (!retryResponse.ok) throw new Error(`API Error: ${retryResponse.status}`);
    const retryText = await retryResponse.text();
    return retryText ? JSON.parse(retryText) : (undefined as T);
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  // ! бэкенд иногда отдаёт пустой body (204 и т.п.)
  const text = await response.text();
  return text ? JSON.parse(text) : (undefined as T);
}

async function doFetch(url: string, options: RequestInit): Promise<Response> {
  const tkn = await token.get();
  return await fetch(`${appConfig.api.URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      Authorization: `Bearer ${tkn}`,
    },
  });
}
