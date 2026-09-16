import { SessionHeader, SessionFooter } from '@/features/session';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <section
      className="flex flex-col min-h-svh w-full items-center *:w-full"
      data-slot="root-layout"
    >
      <SessionHeader />
      {children}
      <SessionFooter />
    </section>
  );
}
