import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rabinale.com.np";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rabin Ale — Portfolio",
    short_name: "Rabin Ale",
    description:
      "Co-Founder & Senior Developer at TypingOwl. Full stack engineer, AI developer, portfolio and projects.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/Logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    id: siteUrl,
  };
}
