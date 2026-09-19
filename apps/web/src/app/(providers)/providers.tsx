import { PropsWithChildren } from 'react';
import JotaiProvider from './jotai-provider';
import { QueryProvider } from './query-provider';
import { TableProvider } from './table-provider';

export function Providers({ children }: Readonly<PropsWithChildren<unknown>>) {
  return (
    <JotaiProvider>
      <TableProvider>
        <QueryProvider>{children}</QueryProvider>
      </TableProvider>
    </JotaiProvider>
  );
}
