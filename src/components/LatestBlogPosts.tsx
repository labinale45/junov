import Link from "next/link";
import { getLatestPosts } from "@/content/blog/posts";

export function LatestBlogPosts() {
  const posts = getLatestPosts(3);

  return (
    <section className="py-24 lg:py-32 bg-slate-900/30 border-y border-slate-800/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-indigo-400 text-sm font-medium tracking-wider uppercase mb-2">Blog</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Latest articles</h2>
            <p className="text-slate-400 mt-2 max-w-xl">
              Tutorials and notes on Java, Next.js, and teaching programming—written for real classrooms and shipping
              code.
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 px-6 py-3 rounded-xl border border-slate-600 text-slate-200 hover:bg-slate-800/60 transition-colors text-sm font-medium"
          >
            View all posts
          </Link>
        </div>
        <ul className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="glass rounded-2xl p-6 h-full flex flex-col border border-slate-700/40 hover:border-indigo-500/20 transition-colors">
                <p className="text-xs text-slate-500 mb-2">
                  {post.category} · {post.readTimeMinutes} min
                </p>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:text-indigo-400 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 line-clamp-3">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 text-indigo-400 text-sm font-medium hover:text-indigo-300"
                >
                  Read more →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
