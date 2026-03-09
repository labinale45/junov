"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const aboutImages = [
  { src: "/rabin-ale.png", alt: "Rabin Ale - Developer and Educator" },
  { src: "/rabin-short-forma-nobg.png", alt: "Rabin Ale - Professional Headshot" },
];

const interests = [
  "Artificial Intelligence",
  "Web Development",
  "Game AI",
  "3D and Interactive Systems",
  "Educational Technology",
];

export function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % aboutImages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 lg:py-32 bg-slate-900/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
              <div className="relative glass rounded-3xl overflow-hidden aspect-[4/6] max-w-[280px] mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={aboutImages[activeIndex].src}
                      alt={aboutImages[activeIndex].alt}
                      width={350}
                      height={500}
                      className="rounded-2xl object-contain w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right: Story */}
          <div className="order-1 lg:order-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-8"
            >
              About Me
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-slate-300 leading-relaxed"
            >
              <p>
                I am a developer, educator, and AI enthusiast based in Nepal. I
                specialize in building modern web applications, AI tools, and
                interactive systems.
              </p>
              <p>
                Currently I work as a <strong className="text-white">Computer Trainer</strong>, teaching programming
                and software development to students ranging from beginner to
                advanced level, while also developing my own technology projects.
              </p>
              <p>
                I am also the{" "}
                <strong className="text-indigo-400">Co-Founder and Senior Developer of TypingOwl</strong>, a
                platform designed to help users improve typing speed and
                productivity through modern web technologies.
              </p>
              <p className="font-medium text-slate-200">My interests include:</p>
              <ul className="space-y-2">
                {interests.map((interest, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-indigo-400">•</span>
                    {interest}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
