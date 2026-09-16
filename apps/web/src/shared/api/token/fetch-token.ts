import { endpoints } from '@/shared/model';
import { CreateSession201 } from '../gen/model';
import { fetchRaw } from '../fetch/fetch-raw';

export async function fetchToken(): Promise<CreateSession201> {
  return fetchRaw<CreateSession201>(endpoints.SESSIONS, { method: 'POST', body: '{}' });
}
