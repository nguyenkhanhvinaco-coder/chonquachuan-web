import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import BangGiaLich from "@/components/BangGiaLich";
import MauLichGallery from "@/components/MauLichGallery";
import BannerDocQuyen from "@/components/BannerDocQuyen";
import { ZaloIcon } from "@/components/icons";
import { ZALO_URL, HOTLINE, HOTLINE_TEL } from "@/lib/contact";
import { LOAI_LICH, GHI_CHU_GIA, loaiTheoSlug, anhLon, anhNho, anhChiaSe, giaTu, vnd } from "@/lib/lichTet";

// Trang 1 loại lịch: bảng giá + quy cách + lưới các mẫu (bấm xem lớn, ảnh lớn có QR web + Zalo OA).
const SITE_URL = "https://chonquachuan.vn";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOAI_LICH.map((l) => ({ loai: l.slug }));
}

export function generateMetadata({ params }: { params: { loai: string } }): Metadata {
  const l = loaiTheoSlug(params.loai);
  if (!l) return {};
  const title = `${l.ten} 2027 in logo — ${l.soMau} mẫu, giá từ ${vnd(giaTu(l))}`;
  const url = `/lich-tet-2027/${l.slug}`;
  return {
    title,
    description: l.moTa,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: l.moTa,
      url,
      type: "website",
      images: [{ url: anhChiaSe(l), alt: `${l.ten} 2027` }],
    },
  };
}

export default function LoaiLichPage({ params }: { params: { loai: string } }) {
  const l = loaiTheoSlug(params.loai);
  if (!l) notFound();
  const so = Array.from({ length: l.soMau }, (_, i) => i + 1);
  const khac = LOAI_LICH.filter((x) => x.slug !== l.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Lịch Tết 2027", item: `${SITE_URL}/lich-tet-2027` },
      { "@type": "ListItem", position: 3, name: l.ten, item: `${SITE_URL}/lich-tet-2027/${l.slug}` },
    ],
  };

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <nav className="px-5 pt-5 md:px-[72px] text-[13.5px] text-ink-soft">
        <Link href="/lich-tet-2027" className="!text-ink-soft hover:underline">
          Lịch Tết 2027
        </Link>{" "}
        › <span className="text-ink">{l.ten}</span>
      </nav>

      <section className="px-5 pt-3 pb-6 md:px-[72px] grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_420px] items-start">
        <div className="flex flex-col gap-3 min-w-0">
          <h1 className="font-serif text-[26px] md:text-[34px] leading-tight">{l.ten} 2027</h1>
          <p className="text-ink-soft text-[15px] leading-relaxed">{l.moTa}</p>
          <ul className="text-[14.5px] leading-relaxed list-disc pl-5">
            {l.quyCach.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[15px] font-bold bg-[#0068FF] !text-white min-h-[44px]"
          >
            <ZaloIcon size={20} />
            Nhận báo giá in logo qua Zalo
          </a>
        </div>
        <div className="flex flex-col gap-2 min-w-0">
          <BangGiaLich tieuDe="Bảng giá (đã gồm VAT 8%)" dong={l.gia} />
          {l.ghiChuGia && <p className="text-[13.5px] text-ink-soft">{l.ghiChuGia}</p>}
        </div>
      </section>

      <section className="px-5 pb-6 md:px-[72px]">
        <BannerDocQuyen gon />
      </section>

      <section className="px-5 pb-8 md:px-[72px] flex flex-col gap-4">
        <h2 className="font-serif text-[22px] md:text-[26px] leading-snug">
          {l.soMau} mẫu {l.ten.toLowerCase()} — bấm vào mẫu để xem lớn
        </h2>
        <MauLichGallery
          ten={l.ten}
          anhNho={so.map((n) => anhNho(l, n))}
          anhLon={so.map((n) => anhLon(l, n))}
          rong={l.anhRong}
          cao={l.anhCao}
          nhoCao={l.anhNhoCao}
        />
        <ul className="text-[13.5px] text-ink-soft leading-relaxed list-disc pl-5">
          {GHI_CHU_GIA.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </section>

      <section className="px-5 pb-10 md:px-[72px] flex flex-col gap-3">
        <h2 className="font-serif text-[20px] md:text-[22px]">Xem loại lịch khác</h2>
        <div className="flex flex-wrap gap-2">
          {khac.map((x) => (
            <Link
              key={x.slug}
              href={`/lich-tet-2027/${x.slug}`}
              className="rounded-full bg-[#C8102E] px-4 py-2 text-[14px] font-bold !text-white shadow-[0_3px_10px_rgba(200,16,46,0.3)] hover:bg-[#A50D26]"
            >
              {x.ten} · {x.soMau} mẫu
            </Link>
          ))}
        </div>
        <p className="text-[14px] text-ink-soft">
          Hotline / Zalo{" "}
          <a href={`tel:${HOTLINE_TEL}`} className="font-semibold !text-ink">
            {HOTLINE}
          </a>
          {" · "}
          <Link href="/lich-tet-2027#bang-gia" className="font-semibold !text-ink underline">
            Bảng giá tất cả các loại lịch
          </Link>
        </p>
      </section>
    </div>
  );
}
