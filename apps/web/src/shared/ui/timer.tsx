import { useCountdown } from '@/shared/lib';

type DurationStyle = 'narrow' | 'short' | 'long' | 'clock';

export function Timer({
  expiresAt,
  format = 'narrow',
  locale,
}: {
  expiresAt: string;
  format?: DurationStyle;
  locale?: string;
}) {
  const { remainingMs } = useCountdown(expiresAt);
  return <time>{formatDuration(remainingMs, format, locale)}</time>;
}

function formatDuration(ms: number, style: DurationStyle = 'narrow', locale = 'ru') {
  const totalMinutes = Math.max(0, Math.ceil(ms / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (style === 'clock') {
    const twoDigits = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 });
    return `${hours}:${twoDigits.format(minutes)}`;
  }

  const hourLabel =
    style === 'long' ? pluralize(hours, ['час', 'часа', 'часов']) : style === 'short' ? 'ч.' : 'ч';
  const minuteLabel =
    style === 'long'
      ? pluralize(minutes, ['минута', 'минуты', 'минут'])
      : style === 'short'
        ? 'мин.'
        : 'мин';
  if (hours === 0) return `${minutes} ${minuteLabel}`;
  return `${hours} ${hourLabel} ${minutes} ${minuteLabel}`;
}

function pluralize(count: number, [one, few, many]: [string, string, string]) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

// narrow	1ч 2м
// short	1 ч 2 мин
// long	1 час 2 минуты
// clock	1:02
