import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import BangGiaLich from "@/components/BangGiaLich";
import BannerDocQuyen from "@/components/BannerDocQuyen";
import { ArrowRightIcon, ZaloIcon } from "@/components/icons";
import { ZALO_URL, HOTLINE, HOTLINE_TEL } from "@/lib/contact";
import { LOAI_LICH, GIA_KHAC, GHI_CHU_GIA, NGAY_AP_DUNG, anhNho, giaTu, vnd } from "@/lib/lichTet";

// Trang tổng Lịch Tết 2027: chọn LOẠI lịch -> /lich-tet-2027/<loại> xem các mẫu của loại đó.
// Dữ liệu loại lịch + giá ở lib/lichTet.ts.
const SITE_URL = "https://chonquachuan.vn";
const TONG_MAU = LOAI_LICH.reduce((s, l) => s + l.soMau, 0);
const TIEU_DE = "Lịch Tết 2027 in logo doanh nghiệp — mẫu và bảng giá";
const MO_TA = `${TONG_MAU} mẫu lịch Tết 2027: lịch để bàn, bìa lịch gắn bloc, lịch 13 tờ, bloc đại, bloc siêu đại. Giá từ ${vnd(
  Math.min(...LOAI_LICH.map(giaTu))
)} đã gồm VAT, in logo doanh nghiệp.`;
const ANH_CHIA_SE = "/lich-tet-2027/og-lich-tet-2027.jpg";

export const metadata: Metadata = {
  title: TIEU_DE,
  description: MO_TA,
  alternates: { canonical: "/lich-tet-2027" },
  openGraph: {
    title: TIEU_DE,
    description: MO_TA,
    url: "/lich-tet-2027",
    type: "website",
    images: [{ url: ANH_CHIA_SE, width: 1200, height: 630, alt: "Mẫu lịch Tết 2027 in logo doanh nghiệp" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Lịch Tết 2027", item: `${SITE_URL}/lich-tet-2027` },
  ],
};

export default function LichTetPage() {
  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <section className="px-5 pt-6 pb-4 md:px-[72px] md:pt-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1.5 max-w-[760px]">
          <span className="inline-flex self-start px-3 py-1 rounded-full text-[12.5px] font-bold text-white bg-[#C8102E]">
            Tết Đinh Mùi 2027
          </span>
          <h1 className="font-serif text-[26px] md:text-[34px] leading-tight">Lịch Tết 2027 in logo doanh nghiệp</h1>
          <p className="text-ink-soft text-[15px]">
            {TONG_MAU} mẫu, {LOAI_LICH.length} loại lịch. Chọn loại lịch để xem các mẫu, bấm vào mẫu để xem lớn. Giá đã
            gồm VAT 8%, áp dụng từ {NGAY_AP_DUNG}.
          </p>
        </div>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[15px] font-bold bg-[#0068FF] !text-white min-h-[44px] shrink-0"
        >
          <ZaloIcon size={20} />
          Nhận báo giá qua Zalo
        </a>
      </section>

      <section className="px-5 pb-6 md:px-[72px]">
        <BannerDocQuyen />
      </section>

      <section className="px-5 pb-8 md:px-[72px] grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {LOAI_LICH.map((l) => (
          <Link
            key={l.slug}
            href={`/lich-tet-2027/${l.slug}`}
            className="group rounded-2xl border border-line bg-surface overflow-hidden flex flex-col !text-ink hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-shadow"
          >
            <Image
              unoptimized
              src={anhNho(l, l.anhDaiDien)}
              alt={`${l.ten} 2027`}
              width={1280}
              height={l.anhNhoCao}
              sizes="(min-width:1280px) 23vw, (min-width:640px) 45vw, 100vw"
              className="w-full h-auto block"
            />
            <span className="flex flex-col gap-1 p-4 flex-1">
              <b className="text-[17px] leading-snug">{l.ten}</b>
              <span className="text-[13.5px] text-ink-soft leading-snug">{l.moTaNgan}</span>
              <span className="mt-auto pt-2 flex items-end justify-between gap-2">
                <span className="text-[13px] text-ink-soft">
                  Từ <b className="text-[17px] text-[#C8102E]">{vnd(giaTu(l))}</b>
                </span>
                <span className="inline-flex items-center gap-1 text-[13.5px] font-bold text-[#C8102E]">
                  {l.soMau} mẫu <ArrowRightIcon size={14} color="currentColor" />
                </span>
              </span>
            </span>
          </Link>
        ))}
      </section>

      <section id="bang-gia" className="px-5 pb-10 md:px-[72px] flex flex-col gap-4 scroll-mt-6">
        <h2 className="font-serif text-[22px] md:text-[26px] leading-snug">Bảng giá lịch Tết 2027</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 items-start">
          {LOAI_LICH.map((l) => (
            <BangGiaLich key={l.slug} tieuDe={l.ten} dong={l.gia} />
          ))}
          <BangGiaLich tieuDe="Khác" dong={GIA_KHAC} />
        </div>
        <ul className="text-[14px] text-ink-soft leading-relaxed list-disc pl-5">
          {GHI_CHU_GIA.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <p className="text-[14px] text-ink-soft">
          Cần tư vấn nhanh: Hotline / Zalo{" "}
          <a href={`tel:${HOTLINE_TEL}`} className="font-semibold !text-ink">
            {HOTLINE}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
