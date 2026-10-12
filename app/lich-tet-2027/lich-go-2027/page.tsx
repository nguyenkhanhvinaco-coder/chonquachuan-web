import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import BannerDocQuyen from "@/components/BannerDocQuyen";
import { ArrowRightIcon, ZaloIcon } from "@/components/icons";
import { ZALO_URL, HOTLINE, HOTLINE_TEL } from "@/lib/contact";
import { LICH_GO } from "@/lib/lichGo";
import { LOAI_LICH, GHI_CHU_GIA, anhNho } from "@/lib/lichTet";
import { BAI_LICH_TET } from "@/lib/baiViet";

// Trang sản phẩm Lịch gỗ để bàn 2027 (12/10/2026). Nội dung lịch gỗ ở lib/lichGo.ts.
// 12/10/2026 (chị Nga): GỘP nội dung bài Lịch Tết 2027 131 mẫu vào trang này (mục #lich-tet-2027);
// /lich-tet-2027 và link bài cũ chuyển hướng về đây. Nội dung bài lấy từ BAI_LICH_TET (lib/baiViet.ts).
const SITE_URL = "https://chonquachuan.vn";
const TONG_MAU = LOAI_LICH.reduce((s, l) => s + l.soMau, 0);
const TIEU_DE = "Lịch gỗ để bàn 2027 độc quyền & 131 mẫu lịch Tết in logo doanh nghiệp";
const MO_TA = `Lịch gỗ để bàn 2027 kèm hộp cắm bút khắc logo — thiết kế độc quyền Chọn Quà Chuẩn. Cùng ${TONG_MAU} mẫu lịch Tết 2027 in logo: lịch để bàn, lịch 13 tờ, bìa gắn bloc, bloc siêu đại. Giá đã gồm VAT.`;
const B = BAI_LICH_TET;

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

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Lịch gỗ để bàn 2027", item: `${SITE_URL}${LICH_GO.href}` },
    ],
  },
  ...(B.hoiDap?.length
    ? [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: B.hoiDap.map((q) => ({
            "@type": "Question",
            name: q.hoi,
            acceptedAnswer: { "@type": "Answer", text: q.dap },
          })),
        },
      ]
    : []),
];

export default function LichGoPage() {
  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      {/* ---------- 1. Lịch gỗ để bàn 2027 (sản phẩm độc quyền) ---------- */}
      {/* 12/10/2026 (chị Nga): video NGANG đặt sát phần chữ (máy tính: chữ trái, video phải; điện thoại: video trên). */}
      <section className="px-5 pt-6 pb-8 md:px-[72px] md:pt-10 flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-center">
        <div className="lg:order-2 lg:flex-1 min-w-0">
          <video
            className="w-full h-auto aspect-video rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] bg-black"
            src={LICH_GO.videoNgang}
            poster={LICH_GO.posterNgang}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Video lịch gỗ để bàn 2027 — hình ảnh mô phỏng 3D"
          />
        </div>
        <div className="flex flex-col gap-4 lg:order-1 lg:w-[520px] lg:shrink-0">
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
          <div className="flex flex-wrap gap-3">
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-[16px] font-bold bg-[#0068FF] !text-white min-h-[48px]"
            >
              <ZaloIcon size={20} />
              Nhận báo giá qua Zalo
            </a>
            <a
              href="#lich-tet-2027"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-[16px] font-bold bg-[#FFC633] !text-[#1A1006] min-h-[48px]"
            >
              Xem thêm {TONG_MAU} mẫu lịch Tết <ArrowRightIcon size={18} color="currentColor" />
            </a>
          </div>
          <p className="text-[13px] text-ink-soft italic">Hình ảnh mô phỏng 3D.</p>
        </div>
      </section>

      {/* ---------- 2. Lịch Tết 2027 — 131 mẫu (gộp từ bài lịch Tết) ---------- */}
      <section id="lich-tet-2027" className="scroll-mt-4 border-t border-line px-5 pt-10 pb-6 md:px-[72px] flex flex-col gap-4">
        <span className="inline-flex self-start px-3 py-1 rounded-full text-[12.5px] font-bold text-white bg-[#C8102E]">
          {TONG_MAU} mẫu · {LOAI_LICH.length} loại lịch
        </span>
        <h2 className="font-serif text-[26px] md:text-[34px] leading-tight">Lịch Tết 2027 in logo doanh nghiệp</h2>
        <div className="flex flex-col gap-3 max-w-[860px] text-[16px] leading-relaxed text-ink-soft">
          {B.moDau.map((p) => (
            <p key={p}>{p.replace("Toàn bộ 131 mẫu và bảng giá chi tiết nằm ở trang Lịch Tết 2027, bấm", "Toàn bộ 131 mẫu và bảng giá chi tiết ở ngay bên dưới, bấm")}</p>
          ))}
        </div>
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
              <span className="mt-auto pt-3">
                <span className="flex items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-4 py-3 text-[17px] md:text-[18px] font-bold text-white shadow-[0_4px_12px_rgba(200,16,46,0.35)] group-hover:bg-[#A50D26] transition-colors">
                  Xem {l.soMau} mẫu <ArrowRightIcon size={18} color="currentColor" />
                </span>
              </span>
            </span>
          </Link>
        ))}
      </section>

      {B.soSanh && (
        <section className="px-5 pb-8 md:px-[72px] flex flex-col gap-3">
          <h3 className="font-serif text-[22px] md:text-[26px]">{B.soSanh.tieuDe}</h3>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-[14.5px] min-w-[640px]">
              <thead className="bg-[#1F3448] text-white">
                <tr>
                  {B.soSanh.cot.map((c) => (
                    <th key={c} className="text-left px-3 py-2.5 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {B.soSanh.dong.map((d) => (
                  <tr key={d[0]} className="border-t border-line align-top">
                    {d.map((o, i) => (
                      <td key={i} className={`px-3 py-2.5 ${i === 0 ? "font-semibold" : ""} ${i === 2 ? "text-[#C8102E] font-bold whitespace-nowrap" : ""}`}>
                        {o}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="px-5 pb-8 md:px-[72px]">
        <BannerDocQuyen />
      </section>

      <section className="px-5 pb-8 md:px-[72px] flex flex-col gap-4 max-w-[980px]">
        <h3 className="font-serif text-[22px] md:text-[26px]">{B.yChinhDanDat ?? "Cần biết trước khi đặt lịch Tết"}</h3>
        <ol className="flex flex-col gap-4">
          {B.yChinh.map((y, i) => (
            <li key={y.tieuDe} className="flex gap-3">
              <span className="flex-none w-8 h-8 rounded-full bg-[#FFD84D] text-[#7A1F0A] font-bold flex items-center justify-center">{i + 1}</span>
              <div className="flex flex-col gap-1">
                <b className="text-[17px]">{y.tieuDe}</b>
                <p className="text-[15.5px] leading-relaxed text-ink-soft">{y.noiDung}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {B.hoiDap && (
        <section className="px-5 pb-8 md:px-[72px] flex flex-col gap-3 max-w-[980px]">
          <h3 className="font-serif text-[22px] md:text-[26px]">Câu hỏi thường gặp</h3>
          {B.hoiDap.map((q) => (
            <details key={q.hoi} className="rounded-xl border border-line px-4 py-3 bg-surface">
              <summary className="font-semibold cursor-pointer text-[15.5px]">{q.hoi}</summary>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{q.dap.replace("Mở trang Lịch Tết 2027, chọn loại lịch", "Chọn loại lịch ở trên")}</p>
            </details>
          ))}
        </section>
      )}

      <section className="px-5 pb-12 md:px-[72px] flex flex-col gap-3 max-w-[980px]">
        <ul className="text-[14px] text-ink-soft leading-relaxed list-disc pl-5">
          {GHI_CHU_GIA.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        {B.ketBai.map((p) => (
          <p key={p} className="text-[15px] leading-relaxed text-ink-soft">
            {p}
          </p>
        ))}
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex self-start items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-[16px] font-bold bg-[#0068FF] !text-white min-h-[48px]"
        >
          <ZaloIcon size={20} />
          Gửi mã mẫu & logo qua Zalo để nhận báo giá
        </a>
      </section>
    </div>
  );
}
