import { Geist, Geist_Mono, Nunito_Sans } from 'next/font/google'
import { cn } from '@/shared/lib/cn'

const nunitoSansHeading = Nunito_Sans({ subsets: ['latin'], variable: '--font-heading' })

const geistSans = Geist({
  variable: '--font-sans',
  display: 'swap',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-mono',
  display: 'swap',
  subsets: ['latin'],
})

export const font = {
  variable: cn(nunitoSansHeading.variable, geistSans.variable, geistMono.variable, 'antialiased'),
  className: cn(geistSans.className),
}
