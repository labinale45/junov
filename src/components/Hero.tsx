"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { value: "4+", label: "Years Development" },
  { value: "10+", label: "Projects Built" },
  { value: "TypingOwl", label: "Co-Founder" },
  { value: "AI + Web", label: "& Game Dev" },
];

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(34,197,94,0.08)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-6 lg:px-12 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-indigo-400 text-sm font-medium tracking-wider uppercase mb-4"
            >
              Welcome to my portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              Rabin Ale
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 mb-6"
            >
              AI Developer • Full Stack Engineer • Co-Founder @ TypingOwl
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed"
            >
              Building intelligent systems, scalable web platforms, and AI-driven
              tools that empower people to learn faster and work smarter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <Link
                href="#projects"
                className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-medium transition-colors"
              >
                View Projects
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300 rounded" />
              </Link>
              <Link
                href="#contact"
                className="px-8 py-4 glass rounded-2xl font-medium hover:bg-slate-800/60 transition-colors border border-slate-700/50"
              >
                Contact Me
              </Link>
              <a
                href="/rabin-ale-cv.pdf"
                download="Rabin-Ale-CV.pdf"
                className="px-8 py-4 glass rounded-2xl font-medium hover:bg-slate-800/60 transition-colors border border-slate-700/50 inline-flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download CV
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-4 text-center hover:border-indigo-500/30 transition-colors"
                >
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />
              <div className="relative glass rounded-3xl p-2 overflow-hidden">
                <Image
                  src="/rabin-short.png"
                  alt="Rabin Ale - Co-Founder & Senior Developer"
                  width={480}
                  height={600}
                  priority
                  className="rounded-2xl object-cover w-full max-w-sm"
                  sizes="(max-width: 768px) 320px, 480px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
