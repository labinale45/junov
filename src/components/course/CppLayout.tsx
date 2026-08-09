"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CppSidebar } from "@/components/course/CppSidebar";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GrainOverlay } from "@/components/immersive/GrainOverlay";

interface CppLayoutProps {
  children: React.ReactNode;
}

export default function CppLayout({ children }: CppLayoutProps) {
  return (
    <SidebarProvider>
      <GrainOverlay />
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <CppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center gap-1 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10 px-3">
            <SidebarTrigger />
            <Link href="/" aria-label="Home" className="ml-2 shrink-0 rounded-full transition-opacity hover:opacity-80">
              <Image src="/Logo.png" alt="Rabin Ale" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
            </Link>
            <Link
              href="/course"
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All Courses
            </Link>
            <span className="ml-1 text-sm font-medium text-muted-foreground">C++ Programming Course</span>
          </header>
          <main className="flex-1 overflow-y-auto no-scrollbar">
            <div className="max-w-4xl mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
