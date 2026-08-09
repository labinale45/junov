import { MinimalSectionLayout } from "@/components/MinimalSectionLayout";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <MinimalSectionLayout tone="violet">{children}</MinimalSectionLayout>;
}
