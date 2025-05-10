import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useDebounce - Debounces a value over a given delay.
 * @param value The value to debounce.
 * @param delay Delay in milliseconds.
 * @returns Debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebouncedCallback - Returns a debounced callback.
 * Ideal for event handlers (e.g., onChange).
 * @param callback The function to debounce.
 * @param delay Delay in milliseconds.
 * @param options Immediate execution control.
 * @returns Debounced function.
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
  options: { leading?: boolean } = {}
): (...args: Args) => void {
  const { leading = false } = options;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leadingExecuted = useRef(false);

  const debounced = useCallback(
    (...args: Args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      if (leading && !leadingExecuted.current) {
        callback(...args);
        leadingExecuted.current = true;
      }

      timer.current = setTimeout(() => {
        if (!leading) {
          callback(...args);
        }
        leadingExecuted.current = false;
      }, delay);
    },
    [callback, delay, leading]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return debounced;
}

export default useDebounce;

// Example usage:
// const debouncedSearch = useDebouncedCallback((term: string) => {
//   fetchResults(term);
// }, 300, { leading: false });
//
// const value = useDebounce(inputValue, 500);
