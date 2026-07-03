import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0B0E14",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#64748B", fontSize: 24 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#3B82F6" }} />
          open to work — denpasar, bali
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24 }}>Adi Sukma</div>
        <div style={{ fontSize: 42, color: "#64748B" }}>builds for the web.</div>
        <div style={{ fontSize: 26, color: "#94A3B8", marginTop: 28 }}>
          Next.js · NestJS · TypeScript — fullstack, end to end.
        </div>
      </div>
    ),
    size,
  );
}
