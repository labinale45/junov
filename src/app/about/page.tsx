import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/LegalPageShell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rabinale.com.np";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Rabinale — free, privacy-first browser tools and games built by Rabin Ale. No uploads, no signups, no paywalls. Learn who built the site and why.",
  alternates: { canonical: `${siteUrl}/about` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About | Rabin Ale",
    description:
      "Free, privacy-first browser tools and games built by Rabin Ale. Learn who built the site and why.",
    url: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <LegalPageShell title="About Rabinale">
      <p>
        Rabinale is a collection of free, browser-based tools and games built and maintained by{" "}
        <strong className="text-slate-200">Rabin Ale</strong>, a full-stack developer and computer trainer based in
        Nepal. I build the image tools, developer utilities, and games on this site the same way I&apos;d want to
        use them myself: fast, free, and without an account wall in the way.
      </p>

      <h2>Why I built this</h2>
      <p>
        Most online image and file tools ask you to sign up, upload your file to a server, or sit through ads before
        you get a result. I wanted a set of tools that skip all of that — you land on the page, do the thing, and
        leave. Every image tool on this site (converter, compressor, resizer, cropper, editor, watermark adder,
        effects, metadata viewer, background remover, favicon generator, color picker) runs entirely in your
        browser using JavaScript&apos;s Canvas and FileReader APIs. There is no upload step because there is no
        server involved in processing your file.
      </p>

      <h2>What&apos;s on this site</h2>
      <ul>
        <li>
          <strong className="text-slate-200">
            <Link href="/tools">Free image and developer tools</Link>
          </strong>{" "}
          — conversion, compression, resizing, cropping, editing, watermarking, EXIF metadata viewing, JSON
          formatting, and an AI code explainer.
        </li>
        <li>
          <strong className="text-slate-200">
            <Link href="/games">Free browser games</Link>
          </strong>{" "}
          — Minesweeper, Tic-Tac-Toe, Memory Match, and Troll Jump, all playable instantly with no download.
        </li>
        <li>
          <strong className="text-slate-200">
            <Link href="/blog">A blog</Link>
          </strong>{" "}
          — practical guides on image formats, web development, and using the tools on this site.
        </li>
        <li>
          <strong className="text-slate-200">
            <Link href="/course">Programming courses</Link>
          </strong>{" "}
          — structured C++ and web design curricula I use in my computer training work.
        </li>
      </ul>

      <h2>Our privacy commitment</h2>
      <p>
        Wherever a tool can run entirely client-side, it does. Images, files, and text you put into the image
        tools, JSON formatter, and games are processed locally in your browser and are never uploaded to a server or
        stored by us. The one exception is the AI-powered Code Explainer, which sends the code you paste to an AI
        API purely to generate an explanation — that code is not logged or stored afterward. Full details are in
        the <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>About the domain</h2>
      <p>
        This site is hosted at rabinale.com.np — a Nepal domain, because that&apos;s honestly where I&apos;m based
        and where I built it. The tools and games work the same for everyone, everywhere; the domain is just part
        of the site&apos;s story.
      </p>

      <h2>Get in touch</h2>
      <p>
        Found a bug, have a tool request, or want to say hello? Email me at{" "}
        <a href="mailto:alejunov@gmail.com">alejunov@gmail.com</a>.
      </p>
    </LegalPageShell>
  );
}
