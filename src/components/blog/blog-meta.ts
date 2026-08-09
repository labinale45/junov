import { BookOpen, Code2, GraduationCap, type LucideIcon } from "lucide-react";

interface CategoryMeta {
  icon: LucideIcon;
  className: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  Java: { icon: Code2, className: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
  "Web Development": { icon: BookOpen, className: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
  Teaching: { icon: GraduationCap, className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
};

const DEFAULT_META: CategoryMeta = { icon: BookOpen, className: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" };

export function getCategoryMeta(category: string): CategoryMeta {
  return CATEGORY_META[category] ?? DEFAULT_META;
}
