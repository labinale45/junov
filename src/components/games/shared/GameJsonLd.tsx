import { getSiteUrl } from "@/lib/site";
import type { GameDef } from "@/lib/games-registry";

export function GameJsonLd({ game }: { game: GameDef }) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/games/${game.slug}`;

  const videoGame = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.name,
    url,
    genre: game.categoryLabel.replace(/ Games$/, ""),
    gamePlatform: "Web Browser",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: game.description,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Games", item: `${siteUrl}/games` },
      { "@type": "ListItem", position: 3, name: game.name, item: url },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: game.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGame) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
    </>
  );
}
