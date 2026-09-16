import { appConfig } from '@/shared/model';

export const rawFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${appConfig.api.URL}${url}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  if (!response.ok) throw new Error(`API Error: ${response.status}`);

  const text = await response.text();
  return text ? JSON.parse(text) : (undefined as T);
};
