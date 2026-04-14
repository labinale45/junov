import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteUrl } from "@/lib/site";
import { getAllPostSlugs, getPostBySlug } from "@/content/blog/posts";
import { ArticleBody } from "@/components/markdown/ArticleBody";

const siteUrl = getSiteUrl();

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: `${siteUrl}/blog/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${siteUrl}/blog/${post.slug}/opengraph-image`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Rabin Ale",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Rabin Ale",
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 container mx-auto px-6 lg:px-12 py-12 lg:py-16 max-w-3xl">
        <p className="text-xs text-indigo-400 font-medium uppercase tracking-wide mb-3">
          {post.category} · {post.date} · {post.readTimeMinutes} min read
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">{post.title}</h1>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed">{post.description}</p>
        <ArticleBody content={post.body} />
        <div className="mt-16 pt-8 border-t border-slate-800">
          <Link href="/blog" className="text-indigo-400 hover:text-indigo-300 font-medium">
            ← All posts
          </Link>
        </div>
      </main>
    </>
  );
}
