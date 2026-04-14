import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 border-t border-slate-800/50 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center gap-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Rabin Ale. All rights reserved.</p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-400">
            <Link href="/blog" className="hover:text-slate-200 transition-colors">
              Blog
            </Link>
            <Link href="/tools" className="hover:text-slate-200 transition-colors">
              Tools
            </Link>
            <Link href="/projects" className="hover:text-slate-200 transition-colors">
              Projects
            </Link>
            <Link href="/privacy-policy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">
              Terms of Use
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
