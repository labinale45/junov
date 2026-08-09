import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/immersive/SpotlightCard";
import type { ProjectEntry } from "@/content/projects/cases";

export function ProjectCard({ project, featured = false }: { project: ProjectEntry; featured?: boolean }) {
  return (
    <SpotlightCard
      href={`/projects/${project.slug}`}
      color="99,102,241"
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_16px_36px_-12px_rgba(99,102,241,0.4)] ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      {project.showcaseImage ? (
        <div
          className={`relative shrink-0 bg-slate-950/60 ${
            featured ? "h-52 lg:h-auto lg:w-[42%]" : "h-40"
          }`}
        >
          <Image src={project.showcaseImage} alt="" fill className="object-contain p-6" sizes="(max-width: 1024px) 100vw, 40vw" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-medium text-indigo-300">
            {project.projectType}
          </span>
          {project.collaboration ? (
            <span className="rounded-full border border-white/[0.08] bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300">
              {project.collaboration}
            </span>
          ) : null}
        </div>

        <h2 className={`font-bold text-slate-50 transition-colors group-hover:text-white ${featured ? "text-2xl" : "text-lg"}`}>
          {project.title}
        </h2>
        <p className={`leading-relaxed text-slate-400 ${featured ? "text-base" : "text-sm line-clamp-2"}`}>
          {project.shortDescription}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {project.tech.slice(0, featured ? project.tech.length : 3).map((t) => (
            <span key={t} className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] text-slate-400">
              {t}
            </span>
          ))}
        </div>

        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-indigo-400">
          Read case study
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </SpotlightCard>
  );
}
