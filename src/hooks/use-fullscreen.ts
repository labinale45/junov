"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

function subscribeFullscreenChange(callback: () => void) {
  document.addEventListener("fullscreenchange", callback);
  return () => document.removeEventListener("fullscreenchange", callback);
}

function getFullscreenSnapshot() {
  return Boolean(document.fullscreenElement);
}

function getFullscreenServerSnapshot() {
  return false;
}

function subscribeNever() {
  return () => {};
}

function getSupportSnapshot() {
  return typeof document.documentElement.requestFullscreen === "function";
}

function getSupportServerSnapshot() {
  return false;
}

/**
 * Toggles the native Fullscreen API on the element attached via the returned `containerRef`.
 * Owns the ref itself (a callback ref, captured during commit) rather than accepting one from
 * the caller, so the DOM node never needs to be read during render — keeps this lint-clean
 * under the "no ref access during render" rule while staying SSR-safe (useSyncExternalStore,
 * same bridging pattern as useLocalStorageJSON).
 */
export function useFullscreen() {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const containerRef = useCallback((node: HTMLElement | null) => setEl(node), []);

  const isFullscreen = useSyncExternalStore(subscribeFullscreenChange, getFullscreenSnapshot, getFullscreenServerSnapshot);
  const isSupported = useSyncExternalStore(subscribeNever, getSupportSnapshot, getSupportServerSnapshot);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el?.requestFullscreen().catch(() => {});
    }
  }, [el]);

  // While fullscreen, portaled UI (popovers, dialogs) must mount inside the fullscreen
  // element itself — anything portaled to document.body sits outside it and the browser
  // simply won't paint it on top of the fullscreen element.
  const portalContainer = isFullscreen ? el : undefined;

  return { containerRef, isFullscreen, isSupported, toggleFullscreen, portalContainer };
}
