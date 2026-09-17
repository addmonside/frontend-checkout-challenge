import type { Metadata } from 'next';
import { font } from '@/shared/assets/fonts';
import './globals.css';
import { Providers } from './(providers)/providers';
import { Toaster } from '@/shared/ui/kit/toast';

export const metadata: Metadata = {
  title: 'Some Shop',
  description: 'Некоторые товары от некоторых людей',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ru" className={font.variable}>
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
