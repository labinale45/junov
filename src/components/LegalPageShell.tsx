"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HEADER_SCROLL_THRESHOLD } from "@/lib/scroll";

export function LegalPageShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <AnimatePresence mode="wait">
        {!isScrolled ? (
          <motion.header
            key="legal-top"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm"
          >
            <div className="container mx-auto px-6 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                <Image src="/Logo.png" alt="Rabin Ale" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                <span className="font-semibold">Rabin Ale</span>
              </Link>
              <Link
                href="/"
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                ← Back to portfolio
              </Link>
            </div>
          </motion.header>
        ) : null}
      </AnimatePresence>

      <main className="container mx-auto px-6 lg:px-12 py-12 lg:py-16 max-w-3xl pt-[4.5rem] md:pt-20">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-white">{title}</h1>
        <div className="space-y-6 text-slate-300 text-[15px] leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-indigo-400 [&_a]:underline hover:[&_a]:text-indigo-300">
          {children}
        </div>
      </main>
      <footer className="border-t border-slate-800/50 py-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Rabin Ale</p>
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <Link href="/privacy-policy" className="hover:text-slate-400">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-slate-400">
            Terms of Use
          </Link>
        </div>
      </footer>
    </div>
  );
}
