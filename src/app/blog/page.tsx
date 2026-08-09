import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/immersive/Reveal";
import { blogPosts } from "@/content/blog/posts";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tutorials and articles on Java, web development, Next.js, teaching programming, and building real projects.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Blog | Rabin Ale",
    description: "Java, web development, and teaching notes.",
    url: `${siteUrl}/blog`,
  },
};

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;

  return (
    <main className="flex-1 container mx-auto max-w-6xl px-6 py-12 lg:px-12 lg:py-16">
      <Reveal>
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
          <Newspaper className="h-3.5 w-3.5" aria-hidden />
          {blogPosts.length} articles
        </span>
        <h1 className="text-4xl font-bold text-white lg:text-5xl">
          Blog
          <BrandLogo size={40} className="ml-3 hidden align-middle sm:inline-flex" />
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          Practical guides for developers and educators — Java, Next.js, and classroom techniques.
        </p>
      </Reveal>

      {featured ? (
        <Reveal delay={0.1} className="mt-12">
          <BlogCard post={featured} featured />
        </Reveal>
      ) : null}

      {rest.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i, 5) * 0.05}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      ) : null}
    </main>
  );
}
