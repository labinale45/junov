import { MinimalSectionLayout } from "@/components/MinimalSectionLayout";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <MinimalSectionLayout tone="indigo">{children}</MinimalSectionLayout>;
}
