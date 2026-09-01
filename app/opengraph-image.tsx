import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Chọn Quà Chuẩn — Tìm quà tặng phù hợp, nhanh và ý nghĩa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = fs.readFileSync(path.join(process.cwd(), "public/logo-icon.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;
  // Nap font tuong minh thay vi de next/og tu tai font mac dinh — buoc tai
  // font mac dinh tung gay crash khi dung sinh anh nay luc build.
  const fontRegular = fs.readFileSync(path.join(process.cwd(), "public/fonts/NotoSans-Regular.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "#F5EFE4",
        }}
      >
        <img src={logoSrc} width={140} height={140} />
        <div style={{ fontSize: 64, fontWeight: 700, color: "#3A2F26" }}>
          Chọn Quà Chuẩn
        </div>
        <div style={{ fontSize: 30, color: "#8A6A52" }}>
          Tìm quà tặng phù hợp, nhanh và ý nghĩa
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Noto Sans", data: fontRegular, weight: 400, style: "normal" }],
    }
  );
}
