import { PropsWithChildren } from 'react';
import { JotaiProvider } from './jotai-provider';
import { QueryProvider } from './query-provider';

export function Providers({ children }: Readonly<PropsWithChildren<unknown>>) {
  return (
    <JotaiProvider>
      <QueryProvider>{children}</QueryProvider>
    </JotaiProvider>
  );
}
