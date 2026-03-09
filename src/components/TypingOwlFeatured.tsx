"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  "Real-time typing analytics",
  "Typing speed tracking (WPM)",
  "Accuracy insights",
  "Gamified typing practice",
  "Responsive web platform",
];

const techStack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Modern Web APIs",
];

export function TypingOwlFeatured() {
  return (
    <section id="typingowl" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-medium tracking-wider uppercase mb-2">
            Featured Project
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold">Current Work</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Gradient card background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-slate-800 to-emerald-600/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.2)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 border border-slate-700/50 rounded-3xl" />

          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden">
                    <Image
                      src="/TypingOwl_logo.webp"
                      alt="TypingOwl"
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">TypingOwl</h3>
                    <p className="text-green-500 font-medium">
                      Co-Founder & Senior Developer
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  TypingOwl is a modern typing practice platform designed to help
                  users improve typing speed, accuracy, and productivity. The
                  platform focuses on performance analytics, interactive lessons,
                  and gamified learning.
                </p>
                <ul className="space-y-3 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <span className="text-emerald-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-8">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-slate-800/80 rounded-lg text-sm text-slate-300 border border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="https://typingowl.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-medium transition-colors"
                  >
                    Visit Website
                  </Link>
                  <Link
                    href="#contact"
                    className="px-6 py-3 glass rounded-xl font-medium hover:bg-slate-800/60 transition-colors"
                  >
                    Case Study
                  </Link>
                </div>
              </div>

              {/* Right: Visual placeholder */}
              <div className="hidden lg:flex justify-center">
                <div className="w-full max-w-sm aspect-[4/3] glass rounded-2xl flex items-center justify-center border border-slate-700/50">
                  <div className="text-6xl">
                    <Image
                      src="/TypingOwl_white.webp"
                      alt="TypingOwl"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
