import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ExternalLink, Mail, Map, Newspaper, ShieldCheck } from "lucide-react";
import { blogPosts } from "@/content/blog/posts";
import { BlogCard } from "@/components/blog/BlogCard";
import { getSiteUrl } from "@/lib/site";
import { GtaCountdown } from "@/components/gta-6/GtaCountdown";
import { BrandLogo } from "@/components/BrandLogo";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "GTA 6: Release Date, News, Trailers & Guides",
  description: "A verified GTA 6 hub covering the release date, platforms, trailers, characters, Vice City, pre-orders, rumors, and the latest updates.",
  alternates: { canonical: `${siteUrl}/gta-6` },
  openGraph: { title: "GTA 6: Release Date, News, Trailers & Guides", description: "Verified GTA 6 news and evergreen guides.", url: `${siteUrl}/gta-6` },
};

const gtaPosts = blogPosts.filter((post) => post.category === "GTA 6");

export default function GtaSixPage() {
  const faqs = [
    ["When is GTA 6 releasing?", "Rockstar currently lists November 19, 2026 as the announced release date. Check the official Rockstar page for any future changes."],
    ["What platforms will GTA 6 launch on?", "The announced launch platforms are PlayStation 5 and Xbox Series X|S. A PC release date has not been officially announced in the sources we track."],
    ["Where is GTA 6 set?", "GTA 6 is set in the fictional state of Leonida, including a modern return to Vice City."],
    ["Is GTA 6 online confirmed?", "Do not treat online features, modes, or timing as confirmed unless Rockstar publishes those details directly."],
    ["Where can I find reliable GTA 6 news?", "Use Rockstar Newswire and the official GTA VI page first. Our guides summarize primary-source announcements and label reports or rumors clearly."],
  ];
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    <main className="flex-1 bg-slate-950">
      <section className="container mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-12 lg:pt-14">
        <div className="mb-7 flex items-center gap-3">
          <BrandLogo size={42} className="ring-2 ring-white/10" />
          <span className="h-5 w-px bg-white/15" aria-hidden />
          <p className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[.18em] text-rose-300"><Newspaper className="h-3.5 w-3.5" /> GTA 6 hub</p>
        </div>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">Everything worth knowing about GTA 6.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">Verified updates, practical guides, and clearly labeled rumors for Rockstar&apos;s next open-world adventure.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#latest" className="rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">Read the latest</a>
            <a href="#alerts" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"><Mail className="h-4 w-4" /> Get update alerts</a>
          </div>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-3">
          <InfoCard icon={<CalendarDays />} label="Launch date" value="November 19, 2026" />
          <InfoCard icon={<Map />} label="Setting" value="Vice City & Leonida" />
          <InfoCard icon={<ShieldCheck />} label="Editorial promise" value="Facts separated from rumors" />
        </div>

        <div className="mt-5 rounded-2xl border-2 border-rose-400/60 bg-rose-500/[0.08] p-5 shadow-[0_0_40px_rgba(244,63,94,0.12)] sm:p-7">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-rose-300">Countdown to launch</p><h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">November 19, 2026</h2></div><span className="text-xs font-medium text-rose-200/70">Announced date · updates when confirmed</span></div>
          <GtaCountdown />
          <p className="mt-4 text-xs text-slate-400">Uses 00:00 UTC. Your local launch time may differ.</p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-400">
          <strong className="text-slate-200">Last verified: September 3, 2026.</strong> Release and platform details are based on Rockstar&apos;s official announcements. <a className="ml-1 inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200" href="https://www.rockstargames.com/VI" target="_blank" rel="noopener noreferrer">View official GTA VI page <ExternalLink className="h-3 w-3" /></a>
        </div>

        <section id="latest" className="mt-14 scroll-mt-8">
          <div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-widest text-rose-300">Explore the coverage</p><h2 className="mt-2 text-3xl font-bold text-white">Latest GTA 6 guides</h2></div><Link href="/blog" className="text-sm text-indigo-300 hover:text-indigo-200">All articles →</Link></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{gtaPosts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
        </section>

        <section id="alerts" className="mt-20 scroll-mt-8 rounded-3xl border border-rose-400/20 bg-gradient-to-br from-rose-950/70 to-slate-900/80 p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-white">Get the important updates</h2>
          <p className="mt-3 max-w-xl text-slate-300">A short email when Rockstar confirms a major detail. No rumor spam, no daily noise, and an unsubscribe link in every message.</p>
          <form className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row" action="mailto:updates@rabinale.com.np" method="post" encType="text/plain">
            <label className="sr-only" htmlFor="gta-email">Email address</label><input id="gta-email" name="email" type="email" required placeholder="you@example.com" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-rose-400" /><button type="submit" className="rounded-xl bg-rose-500 px-5 py-3 font-semibold text-white hover:bg-rose-400">Subscribe</button>
          </form>
          <p className="mt-3 text-xs text-slate-500">Subscription delivery will be connected to your email provider before production launch. See our <Link href="/privacy-policy" className="underline hover:text-slate-300">privacy policy</Link>.</p>
        </section>

        <section className="mt-16 max-w-4xl" aria-labelledby="faq-heading">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-300">GTA 6 FAQ</p>
          <h2 id="faq-heading" className="mt-2 text-3xl font-bold text-white">Quick answers, checked against official information</h2>
          <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-slate-900/50 px-5">
            {faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-white marker:hidden">{question}<span className="float-right text-rose-300 transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl leading-relaxed text-slate-400">{answer}</p></details>)}
          </div>
        </section>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-slate-600">This is an independent fan and information page, not affiliated with Rockstar Games or Take-Two Interactive. GTA, Grand Theft Auto, Rockstar Games, names, marks, and related media belong to their respective owners. We use original summaries and link to official sources; we do not host copyrighted trailers, screenshots, logos, or leaked material.</p>
      </section>
    </main>
    </>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"><div className="flex items-center gap-2 text-rose-300">{icon}<span className="text-xs font-semibold uppercase tracking-wider">{label}</span></div><p className="mt-3 text-lg font-bold text-white">{value}</p></div>;
}
