import { fetchBase } from './fetch-base';
import { handleResponseOrThrow } from './handle-response-or-throw';

export async function fetchRaw<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetchBase(url, undefined, options);
  return handleResponseOrThrow<T>(response);
}
