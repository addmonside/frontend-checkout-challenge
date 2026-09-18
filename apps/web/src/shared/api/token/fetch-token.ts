import { endpoints } from '@/shared/model';
import { fetchRaw } from '../fetch/fetch-raw';
import { CreateSession201 } from '../gen/model';

export async function fetchToken(): Promise<CreateSession201> {
  return fetchRaw<CreateSession201>(endpoints.SESSIONS, { method: 'POST', body: '{}' });
}
