import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rabinale.com.np";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for Rabin Ale’s portfolio website at rabinale.com.np.",
  alternates: { canonical: `${siteUrl}/terms` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms of Use | Rabin Ale",
    description: "Rules and disclaimers for using this portfolio website.",
    url: `${siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms of Use">
      <p>
        These Terms of Use (“Terms”) govern your access to and use of{" "}
        <strong className="text-slate-200">{new URL(siteUrl).hostname}</strong> (the “Site”) operated by Rabin Ale.
        By using the Site, you agree to these Terms. If you do not agree, do not use the Site.
      </p>

      <h2>1. Use of the Site</h2>
      <p>
        The Site is a personal portfolio showcasing projects, experience, and contact information. You may browse and
        share links to the Site for personal, non-commercial purposes. You agree not to misuse the Site, attempt
        unauthorized access, or interfere with its operation.
      </p>

      <h2>2. Intellectual property</h2>
      <p>
        Content on the Site (text, layout, branding, and original media) is owned by Rabin Ale unless otherwise
        stated. Project names and third-party logos may belong to their respective owners. Do not copy, redistribute,
        or modify content without permission, except as allowed by law or for personal reference.
      </p>

      <h2>3. Disclaimer</h2>
      <p>
        The Site is provided “as is” without warranties of any kind. Information about projects, employment, and skills
        is accurate to the best of our knowledge but may change over time. We are not liable for any loss or damage
        arising from your use of the Site or reliance on its content.
      </p>

      <h2>4. Third-party services</h2>
      <p>
        The Site may use third-party services (for example, analytics or advertising). Those services have their own
        terms and privacy policies. See our{" "}
        <a href="/privacy-policy">Privacy Policy</a> for details.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Rabin Ale shall not be liable for any indirect, incidental, special,
        or consequential damages arising from your use of the Site.
      </p>

      <h2>6. Changes</h2>
      <p>
        We may update these Terms at any time. Continued use of the Site after changes constitutes acceptance of the
        revised Terms.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a href="mailto:alejunov@gmail.com">alejunov@gmail.com</a>
      </p>
      <p className="text-slate-500 text-sm">Last updated: February 4, 2026</p>
    </LegalPageShell>
  );
}
