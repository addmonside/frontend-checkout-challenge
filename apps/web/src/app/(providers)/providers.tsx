import { PropsWithChildren } from 'react';
import { QueryProvider } from './query-provider';
import JotaiProvider from './jotai-provider';

export function Providers({ children }: Readonly<PropsWithChildren<unknown>>) {
  return (
    <JotaiProvider>
      <QueryProvider>{children}</QueryProvider>
    </JotaiProvider>
  );
}
