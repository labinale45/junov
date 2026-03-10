"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { href: "#hero", label: "Home", icon: HomeIcon },
  { href: "#about", label: "About", icon: UserIcon },
  { href: "#typingowl", label: "TypingOwl", icon: CodeIcon },
  { href: "#projects", label: "Projects", icon: FolderIcon },
  { href: "#skills", label: "Skills", icon: SparklesIcon },
  { href: "#experience", label: "Experience", icon: BriefcaseIcon },
  { href: "#education", label: "Education", icon: GraduationIcon },
  { href: "#contact", label: "Contact", icon: MailIcon },
];

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" />
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

function GraduationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
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

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", href);
  }
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top header - visible when not scrolled */}
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
              <a href="#hero" onClick={(e) => scrollToSection(e, "#hero")} className="flex items-center gap-3">
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
              </a>
              <div className="hidden md:flex gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          </motion.header>
        ) : (
          /* Floating nav - center bottom when scrolled */
          <motion.div
            key="floating-nav"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 bottom-6 -translate-x-1/2 z-50"
          >
            <div className="border border-slate-600/90 glass py-3 flex gap-1 shadow-xl rounded-2xl px-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="group relative px-3 cursor-pointer"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full text-slate-300 hover:text-indigo-400 transition-colors">
                      <Icon />
                    </div>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap origin-bottom scale-0 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-100">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
