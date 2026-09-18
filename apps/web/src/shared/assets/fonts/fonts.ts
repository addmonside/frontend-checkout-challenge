import { cn } from 'cn';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-sans',
  display: 'swap',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  display: 'swap',
  subsets: ['latin'],
});

export const font = {
  variable: cn(geistSans.variable, geistMono.variable, 'antialiased'),
  className: cn(geistSans.className),
};
