import { ArrowRight, Clock } from "lucide-react";
import { SpotlightCard } from "@/components/immersive/SpotlightCard";
import type { BlogPost } from "@/content/blog/posts";
import { getCategoryMeta } from "@/components/blog/blog-meta";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const { icon: Icon, className: badgeClass } = getCategoryMeta(post.category);

  return (
    <SpotlightCard
      href={`/blog/${post.slug}`}
      color="99,102,241"
      className={`group flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_16px_36px_-12px_rgba(99,102,241,0.4)] ${
        featured ? "lg:p-8" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${badgeClass}`}>
          <Icon className="h-3 w-3" aria-hidden />
          {post.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Clock className="h-3 w-3" aria-hidden />
          {post.readTimeMinutes} min
        </span>
      </div>

      <div className="flex-1">
        <h2 className={`font-bold text-slate-50 transition-colors group-hover:text-white ${featured ? "text-2xl lg:text-3xl" : "text-lg"}`}>
          {post.title}
        </h2>
        <p className={`mt-2.5 leading-relaxed text-slate-400 ${featured ? "text-base" : "text-sm line-clamp-3"}`}>
          {post.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </time>
        <span className="inline-flex items-center gap-1 font-medium text-indigo-400">
          Read article
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </SpotlightCard>
  );
}
