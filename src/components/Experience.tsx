"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Computer Trainer",
    org: "Present",
    period: "Present",
    description:
      "Teaching programming and software development to students ranging from beginner to advanced level.",
    responsibilities: [
      "Teaching Java programming",
      "Teaching web development",
      "Lab mentoring",
    ],
  },
  {
    title: "Co-Founder & Senior Developer",
    org: "TypingOwl",
    period: null,
    description: "Leading platform development and product design.",
    responsibilities: [
      "Platform architecture",
      "Frontend development",
      "Product design",
      "Feature implementation",
    ],
  },
  {
    title: "Internship",
    org: "Inpro",
    period: null,
    description: "Press Management System development.",
    project: "Press Management System",
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
