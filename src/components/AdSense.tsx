"use client";

import Script from "next/script";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export function AdSenseScript() {
  if (!ADSENSE_ID) return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

export function AdSlot({ slot, format = "auto", fullWidth = true }: { slot: string; format?: "auto" | "rectangle" | "horizontal" | "vertical"; fullWidth?: boolean }) {
  if (!ADSENSE_ID) return null;
  return (
    <div className={fullWidth ? "w-full min-h-[100px]" : ""}>
      <ins
        className="adsbygoogle block"
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidth}
      />
    </div>
  );
}
