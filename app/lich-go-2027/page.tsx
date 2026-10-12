import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import { ZaloIcon } from "@/components/icons";
import { ZALO_URL, HOTLINE, HOTLINE_TEL } from "@/lib/contact";
import { LICH_GO } from "@/lib/lichGo";

// Trang sản phẩm Lịch gỗ để bàn 2027 (12/10/2026). Nội dung ở lib/lichGo.ts.
const SITE_URL = "https://chonquachuan.vn";
const TIEU_DE = "Lịch gỗ để bàn 2027 khắc logo doanh nghiệp — thiết kế độc quyền";
const MO_TA =
  "Lịch gỗ để bàn 2027 kèm hộp cắm bút khắc laser logo doanh nghiệp, tờ lịch in riêng theo thương hiệu, có âm lịch Tết Đinh Mùi. Nhận đặt theo yêu cầu.";

export const metadata: Metadata = {
  title: TIEU_DE,
  description: MO_TA,
  alternates: { canonical: LICH_GO.href },
  openGraph: {
    title: TIEU_DE,
    description: MO_TA,
    url: LICH_GO.href,
    type: "website",
    images: [{ url: LICH_GO.anhChiaSe, width: 1200, height: 630, alt: "Lịch gỗ để bàn 2027 kèm hộp cắm bút khắc logo" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Lịch gỗ để bàn 2027", item: `${SITE_URL}${LICH_GO.href}` },
  ],
};

export default function LichGoPage() {
  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <section className="px-5 pt-6 pb-8 md:px-[72px] md:pt-10 flex flex-col md:flex-row gap-8 md:gap-14 md:items-start">
        <div className="flex justify-center md:order-2 md:shrink-0">
          <video
            className="rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] h-[480px] md:h-[640px] w-auto aspect-[9/16] bg-black"
            src={LICH_GO.video}
            poster={LICH_GO.poster}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Video lịch gỗ để bàn 2027 — hình ảnh mô phỏng 3D"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 md:order-1">
          <span className="inline-flex self-start px-3 py-1 rounded-full text-[12.5px] font-bold text-white bg-[#C8102E]">
            Tết Đinh Mùi 2027
          </span>
          <h1 className="font-serif text-[28px] md:text-[40px] leading-tight">{LICH_GO.tieuDe}</h1>
          <p className="text-[17px] font-semibold text-[#7A1F0A]">{LICH_GO.phuDe}</p>
          <p className="text-[16px] leading-relaxed text-ink-soft">{LICH_GO.moDau}</p>
          <ul className="flex flex-col gap-2 text-[16px]">
            {LICH_GO.diemNhan.map((d) => (
              <li key={d} className="flex gap-2.5">
                <span className="text-[#0F6B34] font-bold">✓</span>
                {d}
              </li>
            ))}
          </ul>
          <p className="text-[15.5px]">
            Nhận đặt theo số lượng — liên hệ để được tư vấn mẫu và báo giá. Hotline / Zalo{" "}
            <a href={`tel:${HOTLINE_TEL}`} className="font-bold !text-ink">
              {HOTLINE}
            </a>
            .
          </p>
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex self-start items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-[16px] font-bold bg-[#0068FF] !text-white min-h-[48px]"
          >
            <ZaloIcon size={20} />
            Nhận báo giá qua Zalo
          </a>
          <p className="text-[13px] text-ink-soft italic">Hình ảnh mô phỏng 3D.</p>
        </div>
      </section>

      <section className="px-5 pb-12 md:px-[72px] grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {LICH_GO.anh.map((a, i) => (
          <Image
            key={a.src}
            unoptimized
            src={a.src}
            alt={a.alt}
            width={a.w}
            height={a.h}
            sizes="(min-width:768px) 23vw, 48vw"
            className={`w-full h-full object-cover rounded-xl ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}
          />
        ))}
      </section>
    </div>
  );
}
