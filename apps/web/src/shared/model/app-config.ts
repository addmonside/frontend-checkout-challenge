export const appConfig = {
  api: {
    URL: process.env.NEXT_PUBLIC_API_URL,
    URL_FOR_SERVER_COMPONENTS:
      process.env.NEXT_PUBLIC_API_URL_FOR_SERVER_COMPONENTS ?? process.env.NEXT_PUBLIC_API_URL,
  },
  DEVTOOLS_ENABLED: process.env.NEXT_PUBLIC_DEVTOOLS_ENABLED === 'true',
  token: {
    COOKIE_KEY: 'session-token',
    COOKIE_OPTIONS: {
      path: '/',
      sameSite: 'lax' as const,
      secure: process.env.NEXT_PUBLIC_ENV === 'production',
      expires: 30, // 30 дней
    },
  },
  defaultCurrency: 'RUB',
} as const;
