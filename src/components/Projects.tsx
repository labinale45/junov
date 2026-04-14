"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { projects as projectEntries } from "@/content/projects/cases";

function ProjectCard({ project }: { project: (typeof projectEntries)[number] }) {
  return (
    <div className="shrink-0 w-[280px] md:w-[320px]">
      <div className="block h-full glass rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 group border border-transparent">
        <div className="aspect-4/3 bg-slate-800/50 relative overflow-hidden">
          {project.showcaseImage ? (
            <Image
              src={project.showcaseImage}
              alt={`${project.title} showcase`}
              fill
              className="object-contain"
              sizes="320px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-slate-700">{project.title.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors">
            <Link href={`/projects/${project.slug}`} className="text-white">
              {project.title}
            </Link>
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-3">{project.shortDescription}</p>
          <Link
            href={`/projects/${project.slug}`}
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 mb-3 inline-block"
          >
            Case study →
          </Link>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-slate-800/80 rounded text-[10px] text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const CARD_WIDTH = 320;
const GAP = 20;
const SLOT_WIDTH = CARD_WIDTH + GAP;
const LOOP_WIDTH = SLOT_WIDTH * projectEntries.length;
const SLOW_SPEED = 0.3;

export function Projects() {
  const x = useMotionValue(0);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const current = x.get();
      let next = current - SLOW_SPEED;
      if (next <= -LOOP_WIDTH) next += LOOP_WIDTH;
      x.set(next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [x]);

  return (
    <section id="projects" className="py-24 lg:py-32 bg-slate-900/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Projects</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-4">
            A selection of full-stack applications and teaching-oriented builds. Read detailed case studies on the{" "}
            <Link href="/projects" className="text-indigo-400 hover:text-indigo-300">
              projects page
            </Link>
            .
          </p>
        </motion.div>

        <div className="overflow-hidden -mx-6 lg:-mx-12">
          <motion.div className="flex gap-5 w-max" style={{ x }}>
            {[...projectEntries, ...projectEntries].map((project, i) => (
              <ProjectCard key={`${project.slug}-${i}`} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
