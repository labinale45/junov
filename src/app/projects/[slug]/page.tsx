import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/markdown/ArticleBody";
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
        {project.showcaseImage ? (
          <div className="relative w-full max-w-md mx-auto aspect-4/3 mb-10 rounded-xl overflow-hidden bg-slate-900/50 border border-slate-700/50">
            <Image
              src={project.showcaseImage}
              alt=""
              fill
              className="object-contain p-4"
              sizes="400px"
              priority
            />
          </div>
        ) : null}
        <p className="text-xs text-indigo-400 font-medium uppercase tracking-wide mb-2">Case study</p>
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{project.title}</h1>
        <p className="text-lg text-slate-400 mb-8">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-2 py-1 rounded-lg text-xs bg-slate-800 text-slate-300">{project.projectType}</span>
          {project.collaboration ? (
            <span className="px-2 py-1 rounded-lg text-xs bg-slate-800 text-slate-300">{project.collaboration}</span>
          ) : null}
          {project.contextLabel ? (
            <span className="px-2 py-1 rounded-lg text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {project.contextLabel}
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-400 hover:text-indigo-300 font-medium"
          >
            View GitHub repo →
          </Link>
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-300 hover:text-emerald-200 font-medium"
            >
              Visit live product →
            </Link>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 rounded-lg text-xs bg-slate-800 text-slate-300">
              {t}
            </span>
          ))}
        </div>
        <ArticleBody content={project.body} />
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap gap-6">
          <Link href="/projects" className="text-indigo-400 hover:text-indigo-300 font-medium">
            ← All projects
          </Link>
          <Link href="/#projects" className="text-slate-400 hover:text-slate-300 text-sm">
            View carousel on home
          </Link>
        </div>
      </main>
    </>
  );
}
