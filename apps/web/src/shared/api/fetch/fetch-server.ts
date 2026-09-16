import 'server-only';
import { appConfig } from '@/shared/model';
import { fetchBase } from './fetch-base';
import { handleResponseOrThrow } from './handle-response-or-throw';

export const fetchServer = async <T>(
  url: string,
  options: RequestInit & { token: string },
): Promise<T> => {
  try {
    const response = await fetchBase(
      url,
      options.token,
      options,
      appConfig.api.URL_FOR_SERVER_COMPONENTS,
    );
    return handleResponseOrThrow<T>(response);
  } catch (error) {
    console.error('API Error', error);
    throw error;
  }
};
