import type { Metadata } from "next";
import Header from "@/components/Header";
import PaintingCard from "@/components/PaintingCard";
import CardActions from "@/components/CardActions";
import { findCard } from "@/lib/trungThuCards";

const SITE_URL = "https://chonquachuan.vn";

type SP = Record<string, string | string[] | undefined>;

function readParams(searchParams: SP) {
  const pick = (v: string | string[] | undefined, fallback: string) => {
    const s = Array.isArray(v) ? v[0] : v;
    return s && s.trim() ? s.trim() : fallback;
  };
  return {
    tranh: pick(searchParams.tranh, ""),
    tu: pick(searchParams.tu, "Một người bạn"),
    den: pick(searchParams.den, "bạn"),
    loiNhan: pick(searchParams["loi-nhan"], ""),
  };
}

function buildQuery(searchParams: SP) {
  const qs = new URLSearchParams();
  if (searchParams.tranh) qs.set("tranh", String(searchParams.tranh));
  if (searchParams.tu) qs.set("tu", String(searchParams.tu));
  if (searchParams.den) qs.set("den", String(searchParams.den));
  if (searchParams["loi-nhan"]) qs.set("loi-nhan", String(searchParams["loi-nhan"]));
  return qs;
}

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const { tranh, tu, den } = readParams(searchParams);
  const card = findCard(tranh);
  const qs = buildQuery(searchParams);
  const imageUrl = `${SITE_URL}/thiep-trung-thu/xem/anh?${qs.toString()}`;
  const title = `${tu} gửi thiệp "${card.name}" tới ${den} 🏮`;
  const description =
    "Thiệp Trung Thu vẽ bởi một bạn nhỏ thật — xem và gửi lời chúc của riêng bạn, miễn phí, từ Chọn Quà Chuẩn.";

  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: { title, description, images: [{ url: imageUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
  };
}

export default function XemThiepPage({ searchParams }: { searchParams: SP }) {
  const { tranh, tu, den, loiNhan } = readParams(searchParams);
  const card = findCard(tranh);
  const qs = buildQuery(searchParams);
  const shareUrl = `${SITE_URL}/thiep-trung-thu/xem?${qs.toString()}`;
  const imageUrl = `/thiep-trung-thu/xem/anh?${qs.toString()}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Header minimal />
      <div className="flex-1 flex flex-col items-center gap-8 px-6 py-12 bg-surface-2">
        <PaintingCard card={card} tu={tu} den={den} loiNhan={loiNhan} />
        <CardActions shareUrl={shareUrl} imageUrl={imageUrl} den={den} />
      </div>
    </div>
  );
}
