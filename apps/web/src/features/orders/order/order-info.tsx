import { ReactNode } from 'react';

export function OrderInfo({ children }: { children: ReactNode }) {
  return <dl className="grid gap-2">{children}</dl>;
}

export function OrderInfoItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  );
}
