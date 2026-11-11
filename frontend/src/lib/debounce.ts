import { useCallback, useRef } from 'react';

/**
 * Returns a debounced version of the provided callback.
 * The callback is delayed by `delay` ms and resets on each call.
 */
export function useDebounce<T extends (...args: never[]) => void>(
  fn: T,
  delay: number
): T {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay]
  ) as unknown as T;
}

/**
 * Standalone debounce function (non-React).
 * Useful for vanilla event listeners in useEffect.
 */
export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
