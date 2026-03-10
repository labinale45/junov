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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rabin Ale",
  jobTitle: "Co-Founder & Senior Developer",
  worksFor: {
    "@type": "Organization",
    name: "TypingOwl",
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
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rabinale.com",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
