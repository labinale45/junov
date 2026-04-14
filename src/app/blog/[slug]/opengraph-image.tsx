import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/content/blog/posts";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#f8fafc",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div
            style={{
              display: "flex",
              borderRadius: "999px",
              border: "1px solid rgba(99, 102, 241, 0.45)",
              color: "#a5b4fc",
              fontSize: 24,
              padding: "8px 16px",
            }}
          >
            {post?.category ?? "Blog"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 1000 }}>
            <h1 style={{ margin: 0, fontSize: 58, lineHeight: 1.08, fontWeight: 800 }}>
              {post?.title ?? "Blog Post"}
            </h1>
            <p style={{ margin: 0, fontSize: 28, color: "#cbd5e1", fontWeight: 500 }}>
              {post?.description ?? "Developer notes on Java, Next.js, and practical engineering."}
            </p>
          </div>
          <div style={{ fontSize: 24, color: "#94a3b8" }}>rabinale.com.np/blog</div>
        </div>
      </div>
    ),
    size,
  );
}
