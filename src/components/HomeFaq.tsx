import Link from "next/link";

const faqs = [
  ["What does Rabin Ale build?", "AI-powered products, full-stack web applications, developer tools, educational resources, and interactive browser experiences."],
  ["Are the online developer tools free?", "Yes. You can use practical browser tools for image compression, conversion, metadata inspection, JSON formatting, code explanations, and more."],
  ["Where can I learn programming?", "Explore practical programming and web design courses, coding tutorials, project guides, and beginner-friendly explanations."],
  ["Can I play games in my browser?", "Yes. The Games section includes lightweight browser games that work on desktop and mobile without installing software."],
];

export function HomeFaq() {
  return <section className="border-y border-slate-800/50 bg-slate-900/30 py-20 lg:py-24" aria-labelledby="site-faq-heading"><div className="container mx-auto max-w-5xl px-6 lg:px-12"><p className="mb-2 text-sm font-medium uppercase tracking-wider text-indigo-400">Help & resources</p><h2 id="site-faq-heading" className="text-3xl font-bold text-white lg:text-4xl">Frequently asked questions</h2><p className="mt-3 max-w-2xl text-slate-400">Find the fastest route to free tools, practical coding education, and useful projects.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{faqs.map(([question, answer]) => <details key={question} className="rounded-2xl border border-slate-700/50 bg-slate-950/40 p-5"><summary className="cursor-pointer font-semibold text-white">{question}</summary><p className="mt-3 leading-relaxed text-slate-400">{answer}</p></details>)}</div><p className="mt-8 text-sm text-slate-400">Looking for a specific utility? <Link href="/tools" className="text-indigo-300 hover:text-indigo-200">Browse all developer and image tools →</Link></p></div></section>;
}
