import { PortfolioFrame } from "@/components/PortfolioFrame";

export default function GtaLayout({ children }: { children: React.ReactNode }) {
  return <PortfolioFrame><div className="pf-embedded-page">{children}</div></PortfolioFrame>;
}
