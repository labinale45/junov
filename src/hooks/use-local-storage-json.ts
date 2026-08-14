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
 * Reads/writes a JSON-serializable value in localStorage via useSyncExternalStore — same
 * SSR-safe bridging pattern as useLocalStorageNumber, so no hydration mismatch and no
 * setState-in-effect lint violations.
 */
export function useLocalStorageJSON<T>(key: string, fallback: T): [T, (value: T) => void] {
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

  let value: T = fallback;
  if (stored !== null) {
    try {
      value = JSON.parse(stored) as T;
    } catch {
      value = fallback;
    }
  }

  const setValue = useCallback(
    (next: T) => {
      localStorage.setItem(key, JSON.stringify(next));
      notify(key);
    },
    [key]
  );

  return [value, setValue];
}
