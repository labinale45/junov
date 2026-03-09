import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AdSenseScript } from "@/components/AdSense";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rabinale.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rabin Ale | Co-Founder & Senior Developer | AI Developer • Full Stack Engineer",
    template: "%s | Rabin Ale",
  },
  description:
    "Rabin Ale - Co-Founder & Senior Developer at TypingOwl. AI Developer, Full Stack Engineer specializing in Next.js, AI tools, and interactive systems. Building intelligent platforms that empower people to learn faster.",
  keywords: [
    "Rabin Ale",
    "TypingOwl",
    "Full Stack Developer",
    "AI Developer",
    "Next.js",
    "React",
    "Nepal Developer",
    "Computer Trainer",
    "Web Development",
    "Machine Learning",
  ],
  authors: [{ name: "Rabin Ale", url: siteUrl }],
  creator: "Rabin Ale",
  publisher: "Rabin Ale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rabin Ale - Portfolio",
    title: "Rabin Ale | Co-Founder & Senior Developer @ TypingOwl",
    description: "AI Developer • Full Stack Engineer • Building intelligent systems and scalable web platforms.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabin Ale | Co-Founder & Senior Developer",
    description: "AI Developer • Full Stack Engineer • TypingOwl Co-Founder",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your verification codes when ready
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* AdSense: Set NEXT_PUBLIC_ADSENSE_ID in .env to enable */}
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-950 text-slate-100`}
      >
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
