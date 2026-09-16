import 'server-only';
import { getServerToken } from './token/token-storage.server';
import { appConfig } from '@/shared/model';

export const serverFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = await getServerToken(); // middleware уже гарантировал наличие
  console.log('token', token);
  console.log('url', `${appConfig.api.URL_FOR_SERVER_COMPONENTS}${url}`);
  try {
    const response = await fetch(`${appConfig.api.URL_FOR_SERVER_COMPONENTS}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const text = await response.text();
    return text ? JSON.parse(text) : (undefined as T);
  } catch (error) {
    console.error('API Error', error);
    throw error;
  }
};
