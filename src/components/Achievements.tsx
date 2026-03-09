"use client";

import { motion } from "framer-motion";

const achievements = [
  "Built multiple full-stack applications",
  "Co-Founded a tech platform (TypingOwl)",
  "Developed AI experimental projects",
  "Teaching programming professionally",
];

export function Achievements() {
  return (
    <section id="achievements" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Achievements</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Highlights from my development journey.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-emerald-500/20 transition-colors"
            >
              <p className="text-slate-300">{achievement}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
