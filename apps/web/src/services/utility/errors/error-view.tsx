'use client';

import { useAtomValue } from 'jotai';
import { LucideTriangleAlert } from 'lucide-react';
import { ApiError } from '@/shared/api';
import { humanizeErrorPresentation, routes } from '@/shared/model';
import { ButtonLink } from '@/shared/ui/button-link';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/kit/empty';
import { errorPageAtom } from './error-page-atom';
import { errorTitle } from './error-title';

export function ErrorView({ id }: { id: string }) {
  const error = useAtomValue(errorPageAtom);

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <LucideTriangleAlert />
        </EmptyMedia>
        <EmptyTitle>{errorTitle(id)}</EmptyTitle>
        <EmptyDescription>
          {error instanceof ApiError
            ? humanizeErrorPresentation(error).description
            : 'Что-то пошло не так. Вернитесь на главную и попробуйте ещё раз.'}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <ButtonLink href={routes.HOME}>На главную</ButtonLink>
      </EmptyContent>
    </Empty>
  );
}
