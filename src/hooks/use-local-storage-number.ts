"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Map<string, Set<() => void>>();

function notify(key: string) {
  listeners.get(key)?.forEach((l) => l());
}

function getServerSnapshot() {
  return null;
}

/**
 * Reads a numeric value from localStorage via useSyncExternalStore, matching the SSR snapshot (null)
 * on first client render and swapping in the real value post-hydration — avoids a hydration mismatch
 * without the newer react-compiler lint rule flagging setState-in-effect.
 */
export function useLocalStorageNumber(key: string): [number | null, (value: number) => void] {
  const getSnapshot = useCallback(() => localStorage.getItem(key), [key]);
  const subscribe = useCallback(
    (callback: () => void) => {
      if (!listeners.has(key)) listeners.set(key, new Set());
      listeners.get(key)!.add(callback);
      return () => listeners.get(key)?.delete(callback);
    },
    [key]
  );

  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (value: number) => {
      localStorage.setItem(key, String(value));
      notify(key);
    },
    [key]
  );

  return [stored !== null ? Number(stored) : null, setValue];
}
