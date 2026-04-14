import type { Metadata } from "next";
import Link from "next/link";
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

  return (
    <main className="flex-1 container mx-auto px-6 lg:px-12 py-12 lg:py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
      <p className="text-slate-400 mb-12 text-lg">
        Practical guides for developers and educators—Java, Next.js, and classroom techniques.
      </p>
      <ul className="space-y-10">
        {sorted.map((post) => (
          <li key={post.slug}>
            <article>
              <p className="text-xs text-indigo-400 font-medium uppercase tracking-wide mb-2">
                {post.category} · {post.date} · {post.readTimeMinutes} min read
              </p>
              <h2 className="text-2xl font-bold text-white mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-indigo-400 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-3">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-indigo-400 text-sm font-medium hover:text-indigo-300"
              >
                Read article →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
