"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Co-Founder & Senior Developer",
    org: "TypingOwl",
    period: "2025 – Present",
    description: "Leading development of typingowl.com, an educational typing platform.",
    responsibilities: [
      "Managing content, SEO, and user experience for scaling",
      "Integrating modern web technologies for performance and accessibility",
    ],
  },
  {
    title: "Computer Trainer",
    org: "Present",
    period: "2025 – Present",
    description:
      "Teaching students from basic to advanced computer science concepts.",
    responsibilities: [
      "Conducting C programming and 3-month web development course",
      "Designing structured curriculum with practical projects and lab sessions",
    ],
  },
  {
    title: "Software Developer Intern",
    org: "Inpro",
    period: "3 Months",
    description: "Developed a Press Management System for book printing.",
    responsibilities: [
      "Built website using Next.js, Prisma, Tailwind, and TypeScript",
      "Worked on frontend and backend, improving UI/UX and optimizing database queries",
      "Gained hands-on experience in SDLC, teamwork, and project management",
    ],
  },
  {
    title: "Computer Teacher",
    org: "Damauli Future Star Boarding School (DFS)",
    period: "May 2019 – September 2022",
    description: "Taught computer science and guided students in project development.",
    responsibilities: [
      "Taught programming, web development, and database management",
      "Conducted practical sessions and guided students in project development",
      "Assisted in maintaining school computer labs and upgrading software/hardware",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-slate-900/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Experience</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Professional journey and roles.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 border-l-2 border-slate-700"
            >
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-indigo-500" />
              <div className="glass rounded-2xl p-6 mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  {exp.org && (
                    <span className="text-indigo-400 font-medium">
                      @ {exp.org}
                    </span>
                  )}
                  {exp.period && (
                    <span className="text-slate-500 text-sm">{exp.period}</span>
                  )}
                </div>
                <p className="text-slate-400 mb-4">{exp.description}</p>
                {"responsibilities" in exp && (
                  <ul className="space-y-1 text-sm text-slate-500">
                    {(exp as { responsibilities: string[] }).responsibilities.map(
                      (r, j) => (
                        <li key={j}>• {r}</li>
                      )
                    )}
                  </ul>
                )}
                {"project" in exp && (
                  <p className="text-sm text-slate-500">
                    Project: {(exp as { project: string }).project}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
