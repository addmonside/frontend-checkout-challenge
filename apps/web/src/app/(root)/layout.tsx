import { SessionFooter, SessionHeader } from '@/features/session';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <section
      className="flex min-h-svh w-full flex-col items-center *:w-full"
      data-slot="root-layout"
    >
      <SessionHeader />
      {children}
      <SessionFooter />
    </section>
  );
}
