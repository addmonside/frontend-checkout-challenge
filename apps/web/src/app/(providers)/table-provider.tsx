'use client';

import { TanStackDevtools } from '@tanstack/react-devtools';
import { tableDevtoolsPlugin } from '@tanstack/react-table-devtools';
import { appConfig } from '@/shared/model';

export function TableProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {appConfig.DEVTOOLS_ENABLED && <TanStackDevtools plugins={[tableDevtoolsPlugin()]} />}
    </>
  );
}
