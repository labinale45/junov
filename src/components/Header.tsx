"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NavHashLink } from "@/components/NavHashLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HEADER_SCROLL_THRESHOLD } from "@/lib/scroll";

/** Home → TypingOwl; Explore dropdown; then Blog → Contact */
const navLinksBeforeExplore = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/projects", label: "Projects", icon: FolderIcon },
  { href: "/#skills", label: "Skills", icon: SparklesIcon },
  { href: "/#experience", label: "Experience", icon: BriefcaseIcon },
  { href: "/#typingowl", label: "TypingOwl", icon: CodeIcon },
];

const navLinksAfterExplore = [
  { href: "/blog", label: "Blog", icon: BlogIcon },
  { href: "/#about", label: "About", icon: UserIcon },
  { href: "/#contact", label: "Contact", icon: MailIcon },
];

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isScrolled ? (
          <motion.header
            key="top-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <nav className="container mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/Logo.png"
                  alt="Rabin Ale"
                  width={200}
                  height={200}
                  className="w-10 h-10 rounded-full object-cover scale-[1.7]"
                />
                <span className="text-2xl font-bold mt-auto text-gray-300 hover:text-white transition-colors">
                  Mr.J
                </span>
              </Link>
              <div className="hidden lg:flex flex-wrap gap-x-6 gap-y-2 justify-end max-w-3xl items-center">
                {navLinksBeforeExplore.map((link) => (
                  <NavHashLink
                    key={link.href + link.label}
                    href={link.href}
                    className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </NavHashLink>
                ))}
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-slate-300 hover:text-white text-sm font-medium transition-colors inline-flex items-center gap-0.5 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">
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
                {navLinksAfterExplore.map((link) => (
                  <NavHashLink
                    key={link.href + link.label}
                    href={link.href}
                    className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </NavHashLink>
                ))}
              </div>
            </nav>
          </motion.header>
        ) : null}
      </AnimatePresence>
    </>
  );
}
