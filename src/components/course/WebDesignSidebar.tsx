"use client";

import {
  Home,
  Zap,
  Calendar,
  BookOpen,
  FolderKanban,
  Building2,
  Eye,
  ClipboardCheck,
  Shield,
  Rocket,
} from "lucide-react";
import { CourseNavLink } from "@/components/course/CourseNavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const BASE = "/course/web-design";

const navSections = [
  { label: "Overview", items: [{ title: "Home", url: `${BASE}`, icon: Home, end: true as const }] },
  {
    label: "Course Plans",
    items: [
      { title: "1-Month Fast-Track", url: `${BASE}/one-month`, icon: Zap },
      { title: "3-Month Comprehensive", url: `${BASE}/three-month`, icon: Calendar },
    ],
  },
  {
    label: "Learning",
    items: [
      { title: "Core Concepts", url: `${BASE}/concepts`, icon: BookOpen },
      { title: "Demo Projects", url: `${BASE}/demo-projects`, icon: FolderKanban },
      { title: "Real-World Projects", url: `${BASE}/real-projects`, icon: Building2 },
      { title: "Visual Aids", url: `${BASE}/visual-aids`, icon: Eye },
    ],
  },
  {
    label: "Practice",
    items: [
      { title: "Assignments & MCQs", url: `${BASE}/assignments`, icon: ClipboardCheck },
      { title: "Best Practices", url: `${BASE}/best-practices`, icon: Shield },
      { title: "Next Steps", url: `${BASE}/next-steps`, icon: Rocket },
    ],
  },
];

export function WebDesignSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {!collapsed && (
          <div className="px-4 py-5 border-b border-sidebar-border">
            <h2 className="text-lg font-bold text-sidebar-primary-foreground tracking-tight">Web Design</h2>
            <p className="text-xs text-sidebar-foreground/60 mt-0.5">HTML, CSS &amp; JS</p>
          </div>
        )}
        {navSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-[10px] tracking-widest">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <CourseNavLink
                        href={item.url}
                        end={"end" in item && item.end === true}
                        className="hover:bg-sidebar-accent/50"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </CourseNavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
