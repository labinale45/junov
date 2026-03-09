"use client";

import { motion } from "framer-motion";

const techs = [
  { name: "React", emoji: "⚛️" },
  { name: "Next.js", emoji: "▲" },
  { name: "Node", emoji: "🟢" },
  { name: "Python", emoji: "🐍" },
  { name: "AI", emoji: "🤖" },
];

export function TechStack() {
  return (
    <section id="tech-stack" className="py-24 lg:py-32 bg-slate-900/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Tech Stack
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Tools and technologies I work with daily.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="glass rounded-2xl px-8 py-6 flex flex-col items-center gap-2 min-w-[120px] cursor-default hover:border-indigo-500/30 transition-colors"
            >
              <span className="text-4xl">{tech.emoji}</span>
              <span className="font-medium text-slate-300">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
