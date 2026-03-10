"use client";

import { motion } from "framer-motion";
import { FaCode, FaGlobe, FaBrain, FaPaintBrush } from "react-icons/fa";

const skillGroups = [
  {
    title: "Programming",
    icon: <FaCode />,
    skills: ["Java", "JavaScript", "TypeScript", "Python", "C", "C#"],
  },
  {
    title: "Web Development",
    icon: <FaGlobe />,
    skills: ["Next.js", "React", "Tailwind CSS", "Prisma", "Supabase"],
  },
  {
    title: "AI / Machine Learning",
    icon: <FaBrain />,
    skills: ["Neural Networks", "Machine Learning Fundamentals", "AI Integration"],
  },
  {
    title: "Creative Tools",
    icon: <FaPaintBrush />,
    skills: ["Blender", "Unity", "Godot", "Photoshop","DaVinci Resolve"]
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Skills</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Technologies and tools I use to build products.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-indigo-500/20 transition-colors"
            >
              <div className="text-3xl mb-4">{group.icon}</div>
              <h3 className="text-lg font-bold mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="text-slate-400 text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
