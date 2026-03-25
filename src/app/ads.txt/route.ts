import { NextResponse } from "next/server";
import { ADSENSE_PUBLISHER_ID } from "@/lib/adsense";

/** Google AdSense ads.txt — uses NEXT_PUBLIC_ADSENSE_ID or default in @/lib/adsense */
export function GET() {
  const clientId = ADSENSE_PUBLISHER_ID.trim();
  if (!clientId || !clientId.startsWith("ca-pub-")) {
    return new NextResponse(
      "# Set NEXT_PUBLIC_ADSENSE_ID in your environment to activate ads.txt for Google AdSense.\n",
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  }
  const pubId = clientId.replace(/^ca-/, "");
  const body = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
