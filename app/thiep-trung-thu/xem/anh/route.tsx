import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { findCard } from "@/lib/trungThuCards";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tranh = searchParams.get("tranh")?.trim() || "";
  const tu = searchParams.get("tu")?.trim() || "Một người bạn";
  const den = searchParams.get("den")?.trim() || "bạn";
  const card = findCard(tranh);
  const loiNhan = searchParams.get("loi-nhan")?.trim() || card.defaultMessage;

  const imgData = fs.readFileSync(path.join(process.cwd(), "public", card.image));
  const imgSrc = `data:image/jpeg;base64,${imgData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: 50,
          gap: 46,
          backgroundColor: "#F8F3EA",
        }}
      >
        <div
          style={{
            display: "flex",
            flexShrink: 0,
            width: 386,
            height: 530,
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 10px 30px rgba(58,47,38,0.2)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            width={386}
            height={530}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 10,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#C1543C",
            }}
          >
            Chọn Quà Chuẩn · Tranh vẽ tay thật
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: "#2F241E" }}>{card.name}</div>
          <div style={{ fontSize: 26, color: "#2F241E", display: "flex" }}>
            Gửi tới&nbsp;<span style={{ fontWeight: 700 }}>{den}</span>
          </div>
          <div
            style={{
              fontSize: 21,
              fontStyle: "italic",
              color: "#675B54",
              maxWidth: 620,
              marginTop: 6,
            }}
          >
            &ldquo;{loiNhan}&rdquo;
          </div>
          <div style={{ fontSize: 21, fontWeight: 600, color: "#C1543C", marginTop: 10 }}>
            — Từ {tu}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
