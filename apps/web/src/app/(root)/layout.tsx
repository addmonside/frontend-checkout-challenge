export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <section className="grid min-h-svh w-full justify-items-center" data-slot="root-layout">
      i am root layout
      <main>{children}</main>
    </section>
  );
}
