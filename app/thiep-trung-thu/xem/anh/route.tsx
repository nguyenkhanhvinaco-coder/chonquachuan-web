import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tu = searchParams.get("tu")?.trim() || "Một người bạn";
  const den = searchParams.get("den")?.trim() || "bạn";
  const loiNhan =
    searchParams.get("loi-nhan")?.trim() ||
    "Chúc bạn một mùa trăng tròn đầy, an lành và ấm áp bên người thương.";

  const logoData = fs.readFileSync(path.join(process.cwd(), "public/logo-icon.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

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
          gap: 14,
          padding: 60,
          textAlign: "center",
          backgroundImage:
            "linear-gradient(180deg, #001b40 0%, #00337f 45%, #00409a 75%, #0a2f6b 100%)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 130,
            height: 130,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 4,
          }}
        >
          <div
            style={{
              position: "absolute",
              display: "flex",
              top: 0,
              left: 0,
              width: 130,
              height: 130,
              borderRadius: "50%",
              backgroundImage:
                "radial-gradient(circle at 38% 35%, #FFFDF6 0%, #FBF8F2 55%, #E9DFC5 100%)",
            }}
          />
          <img src={logoSrc} width={72} height={72} style={{ position: "relative" }} />
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#D9BC62",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Chọn Quà Chuẩn
        </div>
        <div style={{ fontSize: 50, fontWeight: 700, color: "#FBF8F2" }}>Trung Thu An Lành</div>
        <div style={{ fontSize: 28, color: "#F5EFDD", display: "flex" }}>
          Gửi tới&nbsp;<span style={{ fontWeight: 700 }}>{den}</span>
        </div>
        <div
          style={{
            fontSize: 23,
            fontStyle: "italic",
            color: "#E9DFC5",
            maxWidth: 820,
          }}
        >
          &ldquo;{loiNhan}&rdquo;
        </div>
        <div style={{ fontSize: 23, fontWeight: 600, color: "#D9BC62", marginTop: 6 }}>
          — Từ {tu}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
