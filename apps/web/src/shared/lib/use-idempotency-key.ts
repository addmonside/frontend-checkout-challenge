'use client';

import { useCallback, useRef } from 'react';

/**
 * Стабильный Idempotency-Key для повторяемых операций.
 *
 * `getKey()` выдаёт ключ и запоминает его: повторный вызов (в том числе после
 * сетевой ошибки) вернёт тот же ключ. `renewKey()` начинает новую операцию —
 * следующий `getKey()` вернёт новый ключ.
 */
export function useIdempotencyKey() {
  const keyRef = useRef<string | undefined>(undefined);

  const getKey = useCallback(() => {
    if (!keyRef.current) keyRef.current = crypto.randomUUID();
    return keyRef.current;
  }, []);

  const renewKey = useCallback(() => {
    keyRef.current = crypto.randomUUID();
  }, []);

  return { getKey, renewKey };
}
