'use client';

import { appConfig } from '@/shared/model';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {appConfig.DEVTOOLS_ENABLED && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
