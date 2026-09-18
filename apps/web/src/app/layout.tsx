import type { Metadata } from 'next';
import { font } from '@/shared/assets/fonts';
import { Toaster } from '@/shared/ui/kit/toast';
import { Providers } from './(providers)/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Some Shop',
  description: 'Некоторые товары от некоторых людей',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ru" className={font.variable}>
      <body className="flex min-h-svh flex-col">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
