import { getSiteUrl } from "@/lib/site";
import type { ToolDef, ToolFaqItem } from "@/lib/tools-registry";

export function ToolJsonLd({
  tool,
  pagePath,
  pageName,
  faqs,
}: {
  tool: ToolDef;
  /** Override the canonical path for variant pages (e.g. a compressor size preset). Defaults to /tools/{slug}. */
  pagePath?: string;
  /** Override the breadcrumb's final label for variant pages. Defaults to the tool's name. */
  pageName?: string;
  /** Override the FAQPage entities for variant pages with their own tailored Q&As. Defaults to the tool's FAQs. */
  faqs?: ToolFaqItem[];
}) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${pagePath ?? `/tools/${tool.slug}`}`;
  const displayFaqs = faqs ?? tool.faqs;

  const webApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: pageName ?? tool.name,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: tool.description,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: pageName ?? tool.name, item: url },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: displayFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
    </>
  );
}
