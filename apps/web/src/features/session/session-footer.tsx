import { LucideCopyright } from 'lucide-react';
import { WidthBoundary } from '@/shared/ui/width-boundary';
import { Logo } from '@/shared/ui/logo';

export function SessionFooter() {
  return (
    <WidthBoundary
      as="footer"
      className="flex flex-col items-center justify-center gap-1 *:[p]:text-md pt-4 pb-6"
      data-slot="session-footer"
    >
      <Logo variant="footer" />
      <p className="flex items-center gap-2">
        <LucideCopyright size={18} /> 2026
      </p>
    </WidthBoundary>
  );
}
