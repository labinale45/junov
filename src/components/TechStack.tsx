"use client";

import React from "react";
import { motion } from "framer-motion";

function ReactIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
      <circle r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NextJsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="nextjs-a" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="white" />
      </mask>
      <g mask="url(#nextjs-a)">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path d="M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.46a90.304 90.304 0 009.509-7.325z" fill="url(#nextjs-b)" />
        <path d="M115 54H126v72H115z" fill="url(#nextjs-c)" />
      </g>
      <defs>
        <linearGradient id="nextjs-b" x1="109" y1="116.375" x2="144.5" y2="160.375" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nextjs-c" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <polygon points="256,20 460,140 460,372 256,492 52,372 52,140" fill="#4CAF50" />
      <polygon points="52,140 256,492 52,372" fill="#3E8E41" />
      <polygon points="256,20 460,140 350,300" fill="#57A847" />
      <polygon points="52,140 256,20 350,300 256,492" fill="#5FB04F" />
    </svg>
  );
}

function AIIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M160 300 C210 290 230 260 256 180 C282 260 302 290 352 300 C302 310 282 340 256 420 C230 340 210 310 160 300 Z" />
      <path d="M300 140 C330 135 340 115 352 80 C364 115 374 135 404 140 C374 145 364 165 352 200 C340 165 330 145 300 140 Z" />
      <path d="M320 360 C350 355 360 335 372 300 C384 335 394 355 424 360 C394 365 384 385 372 420 C360 385 350 365 320 360 Z" />
    </svg>
  );
}


function PythonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454c.771 0 1.395.624 1.395 1.395s-.624 1.395-1.395 1.395a1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"
        fill="url(#python-a)"
      />
      <path
        d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395c0-.77.624-1.394 1.395-1.394s1.395.623 1.395 1.394c0 .772-.624 1.395-1.395 1.395z"
        fill="url(#python-b)"
      />
      <defs>
        <linearGradient
          id="python-a"
          x1="19.075"
          y1="18.782"
          x2="34.898"
          y2="34.658"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#387EB8" />
          <stop offset="1" stopColor="#366994" />
        </linearGradient>
        <linearGradient
          id="python-b"
          x1="28.809"
          y1="28.882"
          x2="45.803"
          y2="45.163"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE052" />
          <stop offset="1" stopColor="#FFC331" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const techs: Array<
  | { name: string; emoji: string }
  | { name: string; Icon: React.ComponentType<{ className?: string }> }
> = [
  { name: "React", Icon: ReactIcon },
  { name: "Next.js", Icon: NextJsIcon },
  { name: "Node", Icon: NodeIcon  },
  { name: "Python", Icon: PythonIcon },
  { name: "AI", Icon: AIIcon },
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
              {"Icon" in tech ? (
                <tech.Icon className="h-12 w-12 shrink-0" />
              ) : (
                <span className="text-4xl">{tech.emoji}</span>
              )}
              <span className="font-medium text-slate-300">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
