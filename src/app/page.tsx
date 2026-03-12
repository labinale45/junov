import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { TypingOwlFeatured } from "@/components/TypingOwlFeatured";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { TechStack } from "@/components/TechStack";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rabinale.com";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rabin Ale",
  jobTitle: "Co-Founder & Senior Developer",
  worksFor: {
    "@type": "Organization",
    name: "TypingOwl",
    url: "https://typingowl.com",
  },
  description:
    "AI Developer, Full Stack Engineer. Building intelligent systems, scalable web platforms, and AI-driven tools.",
  knowsAbout: [
    "Artificial Intelligence",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Teaching & Mentoring",
  ],
  url: siteUrl,
  email: "mailto:alejunov@gmail.com",
  telephone: "+9779826175904",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vyas-1, Damauli",
    addressRegion: "Gandaki",
    addressCountry: "NP",
  },
  sameAs: [
    "https://github.com/labinale45",
    "https://www.linkedin.com/in/rabin-ale-07650a1a3/",
    "https://www.youtube.com/@Mrj-no",
    "https://www.instagram.com/rabinale45/",
  ],
  image: `${siteUrl}/rabin-short.png`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rabin Ale - Portfolio",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <TypingOwlFeatured />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <TechStack />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
