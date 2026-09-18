'use client';

import { atom } from 'jotai';

export const errorPageAtom = atom<Error | null>(null);
