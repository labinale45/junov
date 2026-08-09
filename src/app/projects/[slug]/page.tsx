import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, ExternalLink, GitFork } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { ArticleBody } from "@/components/markdown/ArticleBody";
import { Reveal } from "@/components/immersive/Reveal";
import { getAllProjectSlugs, getProjectBySlug } from "@/content/projects/cases";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.shortDescription,
    keywords: [
      project.title,
      ...project.tech,
      project.projectType === "Academic" ? "academic project case study" : "professional project case study",
      project.collaboration === "Team" ? "team project" : "individual project",
      "software case study",
      "developer portfolio",
    ],
    alternates: { canonical: `${siteUrl}/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Case study`,
      description: project.shortDescription,
      url: `${siteUrl}/projects/${project.slug}`,
      images: [
        {
          url: `${siteUrl}/projects/${project.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.title} case study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case study`,
      description: project.shortDescription,
      images: [`${siteUrl}/projects/${project.slug}/opengraph-image`],
    },
  };
}

export default async function ProjectCasePage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.shortDescription,
    programmingLanguage: project.tech.join(", "),
    codeRepository: project.repoUrl,
    applicationCategory: project.projectType === "Academic" ? "EducationalApplication" : "DeveloperApplication",
    author: { "@type": "Person", name: "Rabin Ale", url: siteUrl },
    url: `${siteUrl}/projects/${project.slug}`,
  };

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
              <Link href="/projects" className="rounded-md px-1.5 py-0.5 transition-colors hover:bg-white/5 hover:text-slate-300">
                Projects
              </Link>
            </nav>
          </div>

          {project.showcaseImage ? (
            <div className="relative mx-auto mb-10 aspect-4/3 w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 shadow-[0_16px_48px_-16px_rgba(99,102,241,0.35)]">
              <Image src={project.showcaseImage} alt="" fill className="object-contain p-4" sizes="400px" priority />
            </div>
          ) : null}

          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-indigo-400">Case study</p>
          <h1 className="mb-4 text-3xl font-bold text-white lg:text-4xl">{project.title}</h1>
          <p className="mb-8 text-lg text-slate-400">{project.shortDescription}</p>

          <div className="mb-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-medium text-indigo-300">
              {project.projectType}
            </span>
            {project.collaboration ? (
              <span className="rounded-full border border-white/[0.08] bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                {project.collaboration}
              </span>
            ) : null}
            {project.contextLabel ? (
              <span className="rounded-full border border-white/[0.08] bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                {project.contextLabel}
              </span>
            ) : null}
          </div>

          <div className="mb-10 flex flex-wrap gap-3">
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 ease-out hover:border-indigo-500/40 hover:text-white"
            >
              <GitFork className="h-4 w-4" aria-hidden />
              View GitHub repo
            </Link>
            {project.liveUrl ? (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 ease-out hover:brightness-110"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Visit live product
              </Link>
            ) : null}
          </div>

          <div className="mb-10 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] text-slate-400">
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ArticleBody content={project.body} />
        </Reveal>

        <div className="mt-16 flex flex-wrap gap-6 border-t border-slate-800 pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All projects
          </Link>
          <Link href="/#projects" className="text-sm text-slate-400 hover:text-slate-300">
            View carousel on home
          </Link>
        </div>
      </main>
    </>
  );
}
