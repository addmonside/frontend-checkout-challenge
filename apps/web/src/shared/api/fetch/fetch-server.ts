import 'server-only';
import { getServerToken } from '../token/token-storage.server';
import { appConfig } from '@/shared/model';
import { fetchBase } from './fetch-base';
import { handleResponseOrThrow } from './handle-response-or-throw';

export const fetchServer = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = await getServerToken(); // proxy уже гарантировал наличие

  try {
    const response = await fetchBase(url, token, options, appConfig.api.URL_FOR_SERVER_COMPONENTS);
    return handleResponseOrThrow<T>(response);
  } catch (error) {
    console.error('API Error', error);
    throw error;
  }
};
