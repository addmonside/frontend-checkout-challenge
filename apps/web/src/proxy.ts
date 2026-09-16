import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchToken } from '@/shared/api';
import { appConfig } from './shared/model';

export async function proxy(request: NextRequest) {
  const existing = request.cookies.get(appConfig.token.COOKIE_KEY)?.value;
  if (existing) return NextResponse.next();

  try {
    const {
      data: { token },
    } = await fetchToken();
    const response = NextResponse.next();
    response.cookies.set(appConfig.token.COOKIE_KEY, token, appConfig.token.COOKIE_OPTIONS);
    return response;
  } catch {
    return NextResponse.next(); // не блокируем страницу, если получение токена не удалось
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
