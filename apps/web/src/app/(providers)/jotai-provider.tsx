'use client';

import { createStore, Provider } from 'jotai';

const store = createStore();

export default function JotaiProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Provider store={store}>{children}</Provider>;
}
