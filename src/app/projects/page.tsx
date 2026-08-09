import type { Metadata } from "next";
import Link from "next/link";
import { FolderGit2 } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/immersive/Reveal";
import { projects } from "@/content/projects/cases";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project case studies with transparent context: professional and academic builds, team/individual ownership, architecture decisions, and lessons learned.",
  keywords: [
    "software project case studies",
    "professional and academic projects",
    "team and individual projects",
    "Next.js portfolio projects",
    "developer portfolio Nepal",
  ],
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: "Projects | Rabin Ale",
    url: `${siteUrl}/projects`,
  },
};

export default function ProjectsIndexPage() {
  const [featured, ...rest] = projects;

  return (
    <main className="flex-1 container mx-auto max-w-6xl px-6 py-12 lg:px-12 lg:py-16">
      <Reveal>
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
          <FolderGit2 className="h-3.5 w-3.5" aria-hidden />
          {projects.length} case studies
        </span>
        <h1 className="text-4xl font-bold text-white lg:text-5xl">
          Projects
          <BrandLogo size={40} className="ml-3 hidden align-middle sm:inline-flex" />
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          Deeper write-ups on selected work — architecture decisions, tradeoffs, and lessons learned. For a quick
          visual overview, see the project carousel on the{" "}
          <Link href="/#projects" className="text-indigo-400 hover:text-indigo-300">
            home page
          </Link>
          .
        </p>
      </Reveal>

      {featured ? (
        <Reveal delay={0.1} className="mt-12">
          <ProjectCard project={featured} featured />
        </Reveal>
      ) : null}

      {rest.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 5) * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      ) : null}
    </main>
  );
}
