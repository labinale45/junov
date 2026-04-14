import { ImageResponse } from "next/og";

export const alt = "Courses - Rabin Ale";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
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
            Courses
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h1 style={{ margin: 0, fontSize: 66, lineHeight: 1.06, fontWeight: 800 }}>C++ and Web Design</h1>
            <p style={{ margin: 0, fontSize: 32, color: "#cbd5e1", fontWeight: 500 }}>
              Practical lessons, projects, assignments
            </p>
          </div>
          <div style={{ fontSize: 26, color: "#94a3b8" }}>rabinale.com.np/course</div>
        </div>
      </div>
    ),
    size,
  );
}
