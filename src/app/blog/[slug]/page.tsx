import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, Clock } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { getSiteUrl } from "@/lib/site";
import { getAllPostSlugs, getPostBySlug } from "@/content/blog/posts";
import { ArticleBody } from "@/components/markdown/ArticleBody";
import { getCategoryMeta } from "@/components/blog/blog-meta";
import { Reveal } from "@/components/immersive/Reveal";

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

  const { icon: CategoryIcon, className: badgeClass } = getCategoryMeta(post.category);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 container mx-auto px-6 lg:px-12 py-12 lg:py-16 max-w-3xl">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <BrandLogo size={32} />
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500">
              <Link href="/" className="rounded-md px-1.5 py-0.5 transition-colors hover:bg-white/5 hover:text-slate-300">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-700" aria-hidden />
              <Link href="/blog" className="rounded-md px-1.5 py-0.5 transition-colors hover:bg-white/5 hover:text-slate-300">
                Blog
              </Link>
            </nav>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${badgeClass}`}>
              <CategoryIcon className="h-3 w-3" aria-hidden />
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3 w-3" aria-hidden />
              {post.readTimeMinutes} min read
            </span>
            <time dateTime={post.date} className="text-xs text-slate-500">
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </time>
          </div>

          <h1 className="mb-6 text-3xl font-bold text-white lg:text-4xl">{post.title}</h1>
          <p className="mb-10 border-l-2 border-indigo-500/40 pl-4 text-lg leading-relaxed text-slate-400">
            {post.description}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ArticleBody content={post.body} />
        </Reveal>

        <div className="mt-16 border-t border-slate-800 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All posts
          </Link>
        </div>
      </main>
    </>
  );
}
