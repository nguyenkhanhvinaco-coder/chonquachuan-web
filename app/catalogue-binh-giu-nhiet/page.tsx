import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { ZaloIcon, ArrowRightIcon } from "@/components/icons";
import { ZALO_URL, HOTLINE, HOTLINE_TEL } from "@/lib/contact";

// Catalogue lat trang binh & ly giu nhiet (39 mau) — nhung tu Heyzine vao ngay trang nay.
// 2026-09-30 (chi Nga): khach bam tu Fanpage phai vao thang chonquachuan.vn, va catalogue
// CHI DUOC XEM, khong tai ve (Heyzine da tat nut tai + in; trang nay cung khong co link tai file).
// Doi catalogue: thay file PDF tren Heyzine (giu nguyen ma 9341fe2a57), khong can sua code.
const HEYZINE = "https://heyzine.com/flip-book/9341fe2a57.html";
const BAI_VIET = "/bai-viet/binh-giu-nhiet-in-logo-qua-tang-doanh-nghiep";
// Anh ngang 1200x630 de Facebook/Zalo hien the xem truoc khi chia se link nay.
const ANH_CHIA_SE = "/marketing/og-catalogue-binh-giu-nhiet.jpg";

const TIEU_DE = "Catalogue bình giữ nhiệt in logo — 39 mẫu, giá từ 65.000 đ";
const MO_TA =
  "Xem catalogue lật trang 39 mẫu bình và ly giữ nhiệt nhập khẩu, in hoặc khắc logo doanh nghiệp theo yêu cầu. Giá từ 65.000 đ/cái.";

export const metadata: Metadata = {
  title: TIEU_DE,
  description: MO_TA,
  alternates: { canonical: "/catalogue-binh-giu-nhiet" },
  openGraph: {
    title: TIEU_DE,
    description: MO_TA,
    url: "/catalogue-binh-giu-nhiet",
    type: "website",
    images: [{ url: ANH_CHIA_SE, width: 1200, height: 630, alt: "Bình giữ nhiệt in logo — catalogue 39 mẫu" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://chonquachuan.vn" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Catalogue bình giữ nhiệt",
      item: "https://chonquachuan.vn/catalogue-binh-giu-nhiet",
    },
  ],
};

export default function CatalogueBinhGiuNhietPage() {
  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <section className="px-5 pt-6 pb-4 md:px-[72px] md:pt-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-serif text-[26px] md:text-[34px] leading-tight">Catalogue bình &amp; ly giữ nhiệt in logo</h1>
          <p className="text-ink-soft text-[15px]">
            39 mẫu nhập khẩu, giá từ 65.000 đ/cái — lật trang để xem, bấm vào giữa trang để phóng to.
          </p>
        </div>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[15px] font-bold bg-accent text-accent-ink min-h-[44px] shrink-0"
        >
          <ZaloIcon size={20} />
          Nhận báo giá qua Zalo
        </a>
      </section>

      <section className="px-0 md:px-[72px]">
        <div className="w-full h-[72vh] min-h-[460px] md:h-[82vh] md:rounded-2xl overflow-hidden border-y md:border border-line bg-[#0f2a3d]">
          <iframe
            src={HEYZINE}
            title="Catalogue bình và ly giữ nhiệt in logo — Nguyên Khánh Vina"
            className="w-full h-full block"
            allowFullScreen
            loading="eager"
          />
        </div>
      </section>

      <section className="px-5 py-8 md:px-[72px] md:py-10 grid gap-3 md:grid-cols-3">
        <Link
          href="/tim-qua"
          className="rounded-2xl border border-line bg-surface p-5 flex items-center justify-between gap-3"
        >
          <span className="flex flex-col gap-1">
            <b className="text-[16px]">Chưa biết chọn mẫu nào?</b>
            <span className="text-ink-soft text-[14px]">Trả lời 5 câu hỏi, nhận gợi ý quà kèm báo giá.</span>
          </span>
          <ArrowRightIcon size={18} color="currentColor" />
        </Link>
        <Link
          href="/catalogue-binh-lock-lock"
          className="rounded-2xl border border-line bg-surface p-5 flex items-center justify-between gap-3"
        >
          <span className="flex flex-col gap-1">
            <b className="text-[16px]">Bảng giá bình Lock&amp;Lock</b>
            <span className="text-ink-soft text-[14px]">10 mẫu, giá từ 250.000 đ đã gồm in logo.</span>
          </span>
          <ArrowRightIcon size={18} color="currentColor" />
        </Link>
        <Link href={BAI_VIET} className="rounded-2xl border border-line bg-surface p-5 flex items-center justify-between gap-3">
          <span className="flex flex-col gap-1">
            <b className="text-[16px]">Nhập khẩu hay Lock&amp;Lock?</b>
            <span className="text-ink-soft text-[14px]">Bảng so sánh và 4 bước chọn đúng ngân sách.</span>
          </span>
          <ArrowRightIcon size={18} color="currentColor" />
        </Link>
        <p className="md:col-span-3 text-ink-soft text-[14px]">
          Cần tư vấn nhanh: Hotline{" "}
          <a href={`tel:${HOTLINE_TEL}`} className="font-semibold text-ink">
            {HOTLINE}
          </a>
          . Giá trong catalogue chưa gồm VAT và phí in logo; báo giá chính thức theo số lượng và thiết kế.
        </p>
      </section>
    </div>
  );
}
