"use client";

import { motion } from "framer-motion";

function SocialSquircleIcons() {
  return (
    <div className="mt-10 flex justify-center">
      {/* Hidden defs for shared squircle clip-path */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl" />

        <div className="relative flex items-end gap-x-3 px-4 py-3">
          {/* GitHub */}
          <a
            href="https://github.com/labinale45"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="relative"
          >
            <div
              style={{ clipPath: "url(#squircleClip)" }}
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border border-gray-600/50 bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:shadow-2xl"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.763-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.302 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.293-1.552 3.299-1.23 3.299-1.23.652 1.653.241 2.873.117 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.93.43.373.824 1.103.824 2.223v3.293c0 .319.192.693.801.575C20.565 21.8 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/rabin-ale-07650a1a3/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="relative"
          >
            <div
              style={{ clipPath: "url(#squircleClip)" }}
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border border-blue-500/50 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:shadow-2xl"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368 3.274 4.23 4.193 3.305 5.337 3.305c1.14 0 2.064.925 2.064 2.063 0 1.139-.924 2.065-2.064 2.065zM7.118 20.452H3.555V9h3.563v11.452z" />
              </svg>
            </div>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@Mrj-no"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="relative"
          >
            <div
              style={{ clipPath: "url(#squircleClip)" }}
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border border-red-500/50 bg-gradient-to-br from-red-600 to-red-800 shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:shadow-2xl"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/rabinale45/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="relative"
          >
            <div
              style={{ clipPath: "url(#squircleClip)" }}
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border border-pink-500/50 bg-gradient-to-br from-orange-500 via-pink-500 to-fuchsia-600 shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:shadow-2xl"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm9.5 1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
              </svg>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+9779826175904"
            aria-label="Phone"
            className="relative"
          >
            <div
              style={{ clipPath: "url(#squircleClip)" }}
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border border-emerald-500/50 bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:shadow-2xl"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.47a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.25 1.01l-2.19 2.1z" />
              </svg>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:alejunov9@gmail.com"
            aria-label="Email"
            className="relative"
          >
            <div
              style={{ clipPath: "url(#squircleClip)" }}
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border border-sky-500/50 bg-gradient-to-br from-sky-500 to-sky-700 shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:shadow-2xl"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v.01L12 13l8-6.99V6H4zm0 12h16V9l-8 7-8-7v9z" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let&apos;s Build Something Amazing
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            Interested in collaboration, AI projects, or development work?
            Let&apos;s connect.
          </p>

          <SocialSquircleIcons />
        </motion.div>
      </div>
    </section>
  );
}
