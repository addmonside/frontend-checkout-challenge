import { useMemo } from 'react';

type DateInput = string | number | Date;

export type DateTimeProps = {
  value: DateInput | null | undefined;
  /** `date` — только дата, `datetime` — дата и время (по умолчанию). */
  variant?: 'date' | 'datetime';
  locale?: string;
  timeZone?: string;
  className?: string;
};

const formatters = new Map<string, Intl.DateTimeFormat>();

function getFormatter(variant: 'date' | 'datetime', locale: string, timeZone?: string) {
  const key = `${variant}|${locale}|${timeZone ?? ''}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      ...(variant === 'datetime' ? { timeStyle: 'short' as const } : {}),
      timeZone,
    });
    formatters.set(key, formatter);
  }
  return formatter;
}

export function DateTime({
  value,
  variant = 'datetime',
  locale = 'ru-RU',
  timeZone,
  className,
}: DateTimeProps) {
  const date = useMemo(() => (value == null ? null : new Date(value)), [value]);

  if (!date || Number.isNaN(date.getTime())) {
    return <span className={className}>—</span>;
  }

  return (
    <time dateTime={date.toISOString()} className={className}>
      {getFormatter(variant, locale, timeZone).format(date)}
    </time>
  );
}
