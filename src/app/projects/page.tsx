import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  return (
    <main className="flex-1 container mx-auto px-6 lg:px-12 py-12 lg:py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-white mb-4">Projects</h1>
      <p className="text-slate-400 mb-12 text-lg">
        Deeper write-ups on selected work. For a quick visual overview, see the project carousel on the{" "}
        <Link href="/#projects" className="text-indigo-400 hover:text-indigo-300">
          home page
        </Link>
        .
      </p>
      <ul className="space-y-12">
        {projects.map((p) => (
          <li key={p.slug} className="glass rounded-2xl overflow-hidden border border-slate-700/50">
            <div className="grid md:grid-cols-[200px_1fr] gap-0">
              {p.showcaseImage ? (
                <div className="relative h-44 md:h-full md:min-h-[200px] w-full md:w-[200px] shrink-0 bg-slate-900/50">
                  <Image
                    src={p.showcaseImage}
                    alt=""
                    fill
                    className="object-contain p-4"
                    sizes="200px"
                  />
                </div>
              ) : null}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  <Link href={`/projects/${p.slug}`} className="hover:text-indigo-400 transition-colors">
                    {p.title}
                  </Link>
                </h2>
                <p className="text-slate-400 mb-4 leading-relaxed">{p.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {p.projectType}
                  </span>
                  {p.collaboration ? (
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300">{p.collaboration}</span>
                  ) : null}
                  {p.contextLabel ? (
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-400">{p.contextLabel}</span>
                  ) : null}
                  {p.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-indigo-400 text-sm font-medium hover:text-indigo-300"
                >
                  Read case study →
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
