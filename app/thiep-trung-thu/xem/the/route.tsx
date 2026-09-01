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

  // Nap font tuong minh (Noto Sans, co day du dau tieng Viet) thay vi de
  // next/og tu tai font mac dinh — co font mac dinh tung gay loi 500 ngau
  // nhien tren mot so moi truong.
  const fontRegular = fs.readFileSync(path.join(process.cwd(), "public/fonts/NotoSans-Regular.ttf"));
  const fontBold = fs.readFileSync(path.join(process.cwd(), "public/fonts/NotoSans-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#141210",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          width={1080}
          height={1440}
          style={{ objectFit: "cover", position: "absolute", top: 0, left: 0 }}
        />

        {/* Nhãn thương hiệu góc trên — de nhan dien du anh bi cat khi hien thumbnail */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 999,
            backgroundColor: "rgba(20,15,10,0.55)",
          }}
        >
          <div style={{ fontSize: 22, display: "flex" }}>🏮</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF", letterSpacing: 0.3 }}>
            chonquachuan.vn
          </div>
        </div>

        {/* Lop phu gradient + chu de len anh */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 760,
            display: "flex",
            background:
              "linear-gradient(to top, rgba(15,12,10,0.95) 0%, rgba(15,12,10,0.82) 38%, rgba(15,12,10,0.0) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "0 64px 56px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 700, color: "#FFFFFF", display: "flex" }}>
            Gửi tới&nbsp;<span style={{ color: "#F0B27A" }}>{den}</span>
          </div>
          <div
            style={{
              fontSize: 24,
              fontStyle: "italic",
              color: "#D9CFC4",
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            &ldquo;{loiNhan}&rdquo;
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#F0B27A", marginTop: 14 }}>
            — Từ {tu}
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1440,
      fonts: [
        { name: "Noto Sans", data: fontRegular, weight: 400, style: "normal" },
        { name: "Noto Sans", data: fontBold, weight: 700, style: "normal" },
      ],
    }
  );
}
