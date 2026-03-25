import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rabinale.com.np";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Rabin Ale’s portfolio at rabinale.com.np, including Google Analytics, cookies, and Google AdSense.",
  alternates: { canonical: `${siteUrl}/privacy-policy` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | Rabin Ale",
    description: "How we collect, use, and protect information on this website.",
    url: `${siteUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy">
      <p>
        This Privacy Policy describes how Rabin Ale (“we”, “us”) handles information when you visit{" "}
        <strong className="text-slate-200">{new URL(siteUrl).hostname}</strong> (the “Site”). By using the Site,
        you agree to this policy. If you do not agree, please do not use the Site.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong className="text-slate-200">Usage data</strong>: pages viewed, approximate region, device type,
          browser, and similar technical data collected automatically when you browse.
        </li>
        <li>
          <strong className="text-slate-200">Information you provide</strong>: for example, if you email us, we
          receive the content of your message and your email address.
        </li>
      </ul>

      <h2>2. Cookies and similar technologies</h2>
      <p>
        We use cookies and similar technologies to operate the Site, remember preferences, measure traffic, and
        (when enabled) show personalized or non-personalized advertising. You can control cookies through your
        browser settings; blocking cookies may affect how the Site works.
      </p>

      <h2>3. Google Analytics</h2>
      <p>
        We use Google Analytics to understand how visitors use the Site. Google may process data as described in{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google’s Privacy Policy
        </a>
        . You can opt out of Google Analytics using the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          Google Analytics Opt-out Browser Add-on
        </a>
        .
      </p>

      <h2>4. Google AdSense</h2>
      <p>
        Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this Site or
        other websites. Google’s use of advertising cookies enables it and its partners to serve ads to you. You may
        opt out of personalized advertising by visiting{" "}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>{" "}
        or{" "}
        <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
          aboutads.info
        </a>
        .
      </p>
      <p>
        For more on how Google uses data when you use our partners’ sites or apps, see{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          How Google uses information from sites or apps that use our services
        </a>
        .
      </p>

      <h2>5. Third-party links</h2>
      <p>
        The Site may link to external websites (for example, GitHub or LinkedIn). We are not responsible for their
        privacy practices. Please read their policies before providing personal data.
      </p>

      <h2>6. Data retention and security</h2>
      <p>
        We retain information only as long as needed for the purposes described here or as required by law. We use
        reasonable measures to protect information, but no method of transmission over the Internet is 100% secure.
      </p>

      <h2>7. Children’s privacy</h2>
      <p>
        The Site is not directed at children under 16. We do not knowingly collect personal information from children.
        If you believe we have collected such information, please contact us and we will delete it.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, or delete personal information, or to
        object to certain processing. To exercise these rights, contact us using the details below.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The “Last updated” date will change when we do. Continued
        use of the Site after changes means you accept the updated policy.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about this Privacy Policy:{" "}
        <a href="mailto:alejunov@gmail.com">alejunov@gmail.com</a>
      </p>
      <p className="text-slate-500 text-sm">Last updated: February 4, 2026</p>
    </LegalPageShell>
  );
}
