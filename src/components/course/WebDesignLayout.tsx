"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { WebDesignSidebar } from "@/components/course/WebDesignSidebar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface WebDesignLayoutProps {
  children: React.ReactNode;
}

export default function WebDesignLayout({ children }: WebDesignLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <WebDesignSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger className="ml-3" />
            <Link
              href="/course"
              className="ml-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All Courses
            </Link>
            <span className="ml-3 text-sm font-medium text-muted-foreground">Web Design Course</span>
          </header>
          <main className="flex-1 overflow-y-auto no-scrollbar">
            <div className="max-w-4xl mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
