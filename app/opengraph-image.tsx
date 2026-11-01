import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#2b3cff", color: "#fff", padding: 72 }}>
        <div style={{ fontSize: 34 }}>{`${site.name}, ${site.role}`}</div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.02 }}>Software for real business problems.</div>
        <div style={{ fontSize: 32, color: "#ffc933" }}>{`${site.location} (${site.tz})`}</div>
      </div>
    ),
    size
  );
}
