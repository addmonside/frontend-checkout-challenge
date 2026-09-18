import { cookies } from 'next/headers';
import 'server-only';
import { appConfig } from '@/shared/model';

export async function getServerToken(): Promise<string | null> {
  return (await cookies()).get(appConfig.token.COOKIE_KEY)?.value ?? null;
}
