"use client";

import { useSyncExternalStore } from "react";
import { CopyButton } from "@/components/tools/shared/CopyButton";

function subscribe() {
  // window.location.href never changes without a full navigation/remount, so there's
  // nothing to subscribe to — this satisfies useSyncExternalStore's contract.
  return () => {};
}

function getSnapshot() {
  return window.location.href;
}

function getServerSnapshot() {
  return "";
}

export function CopyLinkButton({ className = "" }: { className?: string }) {
  // Matches SSR output ("") on the client's first render, then swaps in the real
  // URL post-hydration — avoids a disabled-attribute hydration mismatch.
  const href = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return <CopyButton text={href} label="Copy link to this tool" className={className} disabled={!href} />;
}
