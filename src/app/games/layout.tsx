import { MinimalSectionLayout } from "@/components/MinimalSectionLayout";

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return <MinimalSectionLayout tone="violet">{children}</MinimalSectionLayout>;
}
