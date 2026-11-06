import { ImageResponse } from "next/og";
import { getAllQuestions } from "@/lib/questions";

export const alt = "FE Question Bank";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const count = getAllQuestions().length;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0a0a0b",
        color: "#ededee",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            background: "#818cf8",
          }}
        />
        <div style={{ fontSize: 32, fontWeight: 600 }}>FE Question Bank</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.1 }}>
          From the basics to frontend engineering.
        </div>
        <div style={{ fontSize: 32, color: "#8b8b94" }}>
          {count} curated questions · Basic to Engineering
        </div>
      </div>
    </div>,
    { ...size },
  );
}
