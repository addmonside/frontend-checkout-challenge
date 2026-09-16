import { PropsWithChildren } from 'react';
import { QueryProvider } from './query-provider';

export function Providers({ children }: Readonly<PropsWithChildren<unknown>>) {
  return <QueryProvider>{children}</QueryProvider>;
}
