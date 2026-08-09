export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://rabinale.com.np";
}

/** Branded 1200x630 share-card image for a tool page, rendered by /tools/og. */
export function toolOgImageUrl(title: string, subtitle?: string) {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  return `${getSiteUrl()}/tools/og?${params.toString()}`;
}
