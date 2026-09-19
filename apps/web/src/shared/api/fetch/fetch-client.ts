import { token } from '../token';
import { fetchBase } from './fetch-base';
import { handleResponseOrThrow } from './handle-response-or-throw';

export async function fetchClient<T>(url: string, options: RequestInit): Promise<T> {
  const response = await doFetchWithToken(url, options);

  if (response.status === 401) {
    token.clear();
    const retryResponse = await doFetchWithToken(url, options);
    return handleResponseOrThrow<T>(retryResponse, { withHeaders: true });
  }

  return handleResponseOrThrow<T>(response, { withHeaders: true });
}

async function doFetchWithToken(url: string, options: RequestInit): Promise<Response> {
  const tkn = await token.get();
  return await fetchBase(url, tkn, options);
}
