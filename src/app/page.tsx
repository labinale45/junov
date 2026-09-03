import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { TypingOwlFeatured } from "@/components/TypingOwlFeatured";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { Explore } from "@/components/Explore";
import { TechStack } from "@/components/TechStack";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { LatestBlogPosts } from "@/components/LatestBlogPosts";
import { ScrollToHashOnLoad } from "@/components/ScrollToHashOnLoad";
import { HomeFaq } from "@/components/HomeFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rabinale.com.np";

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
  description:
    "Portfolio, blog, and developer tools by Rabin Ale—full-stack engineering, Java and web teaching, and project case studies.",
};

const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
  ["What does Rabin Ale build?", "Rabin Ale builds AI-powered products, full-stack web applications, developer tools, educational resources, and interactive browser experiences."],
  ["Are the online developer tools free?", "The tools on this site are designed for quick browser-based use, including image compression, conversion, metadata inspection, JSON formatting, and code explanations."],
  ["Where can I learn programming?", "The site includes practical programming and web design courses, tutorials, project guides, and beginner-friendly explanations."],
  ["Can I play games in my browser?", "Yes. The Games section includes lightweight browser games such as memory match, Minesweeper, Tic-Tac-Toe, and Troll Jump."],
].map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <ScrollToHashOnLoad />
      <main>
        <Hero />
        <About />
        <TypingOwlFeatured />
        <LatestBlogPosts />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <Explore />
        <HomeFaq />
        <TechStack />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
