import { useNow } from './use-now';

export function useCountdown(expiresAt: string) {
  const now = useNow();
  const remainingMs = Date.parse(expiresAt) - now;

  return {
    remainingMs,
    remainingMinutes: Math.ceil(remainingMs / 60_000),
    isExpired: remainingMs <= 0,
  };
}
