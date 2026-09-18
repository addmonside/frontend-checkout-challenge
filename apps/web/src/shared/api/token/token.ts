import Cookies from 'js-cookie';
import { appConfig } from '@/shared/model';
import { fetchToken } from './fetch-token';

class Token {
  private pending: Promise<string> | null = null;

  public clear(): void {
    Cookies.remove(appConfig.token.COOKIE_KEY, { path: '/' });
  }

  public async get(): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    const tkn = Cookies.get(appConfig.token.COOKIE_KEY) ?? null;
    if (tkn) return tkn;

    // ! не долбим SESSION_ENDPOINT несколько раз, если несколько запросов стартуют одновременно
    if (this.pending) {
      return this.pending;
    }

    this.pending = fetchToken()
      .then(({ data: { token } }) => {
        this.set(token);
        return token;
      })
      .finally(() => {
        this.pending = null;
      });

    return this.pending;
  }

  private set(token: string): void {
    Cookies.set(appConfig.token.COOKIE_KEY, token, appConfig.token.COOKIE_OPTIONS);
  }
}

const token = new Token();
export { token, Token };
