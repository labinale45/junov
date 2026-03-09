"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "junov",
    description:
      "Personal portfolio of Rabin Ale (Junov) showcasing projects in web development, AI, and interactive 3D experiences.",
    tech: ["TypeScript", "Next.js", "React"],
    link: "https://github.com/labinale45/junov",
  },
  {
    title: "StudentWorks",
    description:
      "Contribution through student with their learning and skills. A platform for student projects and collaborative learning.",
    tech: ["HTML", "Web"],
    link: "https://github.com/labinale45/StudentWorks",
  },
  {
    title: "resultAayo",
    description:
      "Web application project built with JavaScript for dynamic content and user interactions.",
    tech: ["JavaScript"],
    link: "https://github.com/labinale45/resultAayo",
  },
  {
    title: "linkus",
    description:
      "Application developed with C# for connecting and managing resources.",
    tech: ["C#"],
    link: "https://github.com/labinale45/linkus",
  },
  {
    title: "onlineTest",
    description:
      "Online assessment platform for conducting tests and quizzes, built with Java.",
    tech: ["Java"],
    link: "https://github.com/labinale45/onlineTest",
  },
  {
    title: "Press Management System",
    description:
      "A book printing management platform developed during my internship. Manages book orders, printing workflow, and publishing processes.",
    tech: ["Next.js", "Prisma", "Tailwind", "TypeScript"],
    link: "https://github.com/labinale45",
  },
];

export function Projects() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link
                href={project.link}
                className="block h-full glass rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                {"features" in project && (
                  <ul className="space-y-1 mb-4 text-sm text-slate-500">
                    {(project as { features: string[] }).features.map(
                      (f, j) => (
                        <li key={j}>• {f}</li>
                      )
                    )}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-slate-800/80 rounded-lg text-xs text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
