"use client";

import { useEffect, useState } from "react";

const LAUNCH = new Date("2026-11-19T00:00:00Z").getTime();

export function GtaCountdown() {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const firstUpdate = window.setTimeout(() => setRemaining(LAUNCH - Date.now()), 0);
    const timer = window.setInterval(() => setRemaining(LAUNCH - Date.now()), 1000);
    return () => { window.clearTimeout(firstUpdate); window.clearInterval(timer); };
  }, []);

  if (remaining <= 0) return <p className="text-2xl font-black text-white">GTA 6 is now available. Check official retailers for availability.</p>;

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return <div aria-label={`${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until launch`} className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
    {[[days, "Days"], [hours, "Hours"], [minutes, "Minutes"], [seconds, "Seconds"]].map(([value, label]) => <div key={label} className="flex min-h-[92px] flex-col justify-center rounded-xl border border-rose-300/30 bg-slate-950 px-3 py-4 text-center sm:min-h-[116px]"><div className="text-4xl font-black tabular-nums tracking-tight text-white sm:text-5xl">{String(value).padStart(2, "0")}</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[.18em] text-rose-200/80">{label}</div></div>)}
  </div>;
}
