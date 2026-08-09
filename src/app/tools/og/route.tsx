import { ImageResponse } from "next/og";

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Free Online Tools";
  const subtitle = searchParams.get("subtitle") ?? "No upload · No login · Runs in your browser";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "64px",
          background: "linear-gradient(135deg, #0a0f1e 0%, #131a2e 55%, #0a0f1e 100%)",
          color: "#f8fafc",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.28) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              borderRadius: 999,
              border: "1px solid rgba(124,58,237,0.45)",
              color: "#c4b5fd",
              fontSize: 24,
              padding: "10px 20px",
              alignSelf: "flex-start",
              background: "rgba(124,58,237,0.08)",
            }}
          >
            <span style={{ display: "flex" }}>&#10024;</span>
            Free Browser Tool
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
            <h1 style={{ margin: 0, fontSize: 66, lineHeight: 1.08, fontWeight: 800 }}>{title}</h1>
            <p style={{ margin: 0, fontSize: 30, color: "#94a3b8", fontWeight: 500 }}>{subtitle}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#e2e8f0", fontWeight: 700 }}>
              Rabin Ale
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "#64748b" }}>rabinale.com.np/tools</div>
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT }
  );
}
