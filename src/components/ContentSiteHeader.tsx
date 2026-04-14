"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NavHashLink } from "@/components/NavHashLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HEADER_SCROLL_THRESHOLD } from "@/lib/scroll";

const linksBeforeExplore = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
];

const linksAfterExplore = [
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function ContentSiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isScrolled ? (
        <motion.header
          key="content-site-top"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/90 backdrop-blur-md"
        >
          <div className="container mx-auto px-6 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 text-slate-200 hover:text-white transition-colors">
              <Image src="/Logo.png" alt="Rabin Ale" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
              <span className="font-semibold">Rabin Ale</span>
            </Link>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm items-center">
              {linksBeforeExplore.map((l) => (
                <NavHashLink
                  key={l.href}
                  href={l.href}
                  className="text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  {l.label}
                </NavHashLink>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-slate-400 hover:text-indigo-400 transition-colors inline-flex items-center gap-0.5 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">
                  Explore
                  <ChevronDown className="h-4 w-4 opacity-80" aria-hidden />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                  <DropdownMenuItem asChild className="focus:bg-indigo-500/20 data-[highlighted]:bg-indigo-500/20">
                    <Link href="/tools" className="cursor-pointer">
                      Tools
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-indigo-500/20 data-[highlighted]:bg-indigo-500/20">
                    <Link href="/course" className="cursor-pointer">
                      Course
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {linksAfterExplore.map((l) => (
                <NavHashLink
                  key={l.href}
                  href={l.href}
                  className="text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  {l.label}
                </NavHashLink>
              ))}
            </nav>
          </div>
        </motion.header>
      ) : null}
    </AnimatePresence>
  );
}
