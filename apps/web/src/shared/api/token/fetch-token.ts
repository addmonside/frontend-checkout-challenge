import { endpoints } from '@/shared/model';
import { CreateSession201 } from '../gen/model';
import { rawFetch } from './raw-fetch';

export async function fetchToken(): Promise<CreateSession201> {
  return rawFetch<CreateSession201>(endpoints.SESSIONS, { method: 'POST', body: '{}' });
}
