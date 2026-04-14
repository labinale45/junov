import Link from "next/link";

export function ContentSiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-800/50 py-10 bg-slate-950">
      <div className="container mx-auto px-6 lg:px-12 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Rabin Ale</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/privacy-policy" className="hover:text-slate-300">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-slate-300">
            Terms of Use
          </Link>
          <Link href="/blog" className="hover:text-slate-300">
            Blog
          </Link>
        </div>
      </div>
    </footer>
  );
}
