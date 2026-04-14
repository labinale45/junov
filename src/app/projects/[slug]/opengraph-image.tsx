import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/content/projects/cases";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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
          <div style={{ display: "flex", gap: 12 }}>
            <span
              style={{
                display: "flex",
                borderRadius: "999px",
                border: "1px solid rgba(99, 102, 241, 0.45)",
                color: "#a5b4fc",
                fontSize: 22,
                padding: "8px 14px",
              }}
            >
              {project?.projectType ?? "Project"}
            </span>
            {project?.collaboration ? (
              <span
                style={{
                  display: "flex",
                  borderRadius: "999px",
                  border: "1px solid rgba(148, 163, 184, 0.35)",
                  color: "#cbd5e1",
                  fontSize: 22,
                  padding: "8px 14px",
                }}
              >
                {project.collaboration}
              </span>
            ) : null}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 1020 }}>
            <h1 style={{ margin: 0, fontSize: 60, lineHeight: 1.08, fontWeight: 800 }}>
              {project?.title ?? "Project Case Study"}
            </h1>
            <p style={{ margin: 0, fontSize: 28, color: "#cbd5e1", fontWeight: 500 }}>
              {project?.shortDescription ?? "Architecture, tradeoffs, and engineering lessons learned."}
            </p>
          </div>
          <div style={{ fontSize: 24, color: "#94a3b8" }}>rabinale.com.np/projects</div>
        </div>
      </div>
    ),
    size,
  );
}
