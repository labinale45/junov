import { MinimalSectionLayout } from "@/components/MinimalSectionLayout";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <MinimalSectionLayout tone="indigo">{children}</MinimalSectionLayout>;
}
