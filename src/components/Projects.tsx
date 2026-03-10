"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="shrink-0 w-[280px] md:w-[320px]">
      <div className="block h-full glass rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 group">
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
              <span className="text-3xl font-bold text-slate-700">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-3">
            {project.description}
          </p>
          {"features" in project && (
            <ul className="space-y-0.5 mb-3 text-xs text-slate-500">
              {(project as { features: string[] }).features.map((f, j) => (
                <li key={j}>• {f}</li>
              ))}
            </ul>
          )}
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

const projects = [
  {
    title: "TypingOwl",
    description:
      "A modern typing practice platform to help users improve typing speed, accuracy, and productivity through performance analytics, interactive lessons, and gamified learning.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    showcaseImage: "/TypingOwl_white.webp",
  },
  
  // {
  //   title: "AI Group Chat Platform",
  //   description:
  //     "An experimental AI-powered chat platform where users interact with AI agents in group conversations.",
  //   features: ["AI bot responses", "Group chat system", "Real-time messaging"],
  //   tech: ["Next.js", "Supabase", "Python AI bot"],
  //   showcaseImage: null,
  // },
  {
    title: "ResultAayo",
    description:
      "Result Management System for managing and publishing student results efficiently. Features include student authentication, result generation, and secure data storage.",
    tech: ["Next.js", "Tailwind CSS", "Supabase"],
    showcaseImage: "/resultaayo.png",
  },
  {
    title: "Chat-App",
    description:
      "Real-time chat application built with C# and .NET Framework. Implements secure messaging and user authentication.",
    tech: ["C#", ".NET Framework"],
    showcaseImage: "/linkus.png",
  },
  {
    title: "Online Test",
    description:
      "Online test platform built with Java for conducting quizzes and assessments. Features include user login, multiple-choice questions, and result evaluation.",
    tech: ["Java"],
    showcaseImage: "/onlineTest.png",
  },
  {
    title: "Press Management System",
    description:
      "A book printing management platform developed during my internship. Manages book orders, printing workflow, and publishing processes.",
    tech: ["Next.js", "Prisma", "Tailwind", "TypeScript"],
    showcaseImage: "/pressmanagement.png",
  },
];

const CARD_WIDTH = 320;
const GAP = 20;
const SLOT_WIDTH = CARD_WIDTH + GAP;
const LOOP_WIDTH = SLOT_WIDTH * projects.length;
const SLOW_SPEED = 0.3; // pixels per frame (~18px/sec at 60fps)

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
          <p className="text-slate-400 max-w-2xl mx-auto">
            A selection of full-stack applications, AI experiments, and development tools.
          </p>
        </motion.div>

        <div className="overflow-hidden -mx-6 lg:-mx-12">
          <motion.div
            className="flex gap-5 w-max"
            style={{ x }}
          >
            {[...projects, ...projects].map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
