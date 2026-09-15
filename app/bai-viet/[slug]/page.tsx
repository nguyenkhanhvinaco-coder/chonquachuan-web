import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import LeadFormTrigger from "@/components/LeadForm";
import { ArrowRightIcon, ZaloIcon } from "@/components/icons";
import { BAI_VIET, baiVietSlug, ngayVN } from "@/lib/baiViet";
import { ZALO_URL, HOTLINE, HOTLINE_TEL } from "@/lib/contact";

// Trang đọc của MỌI bài viết: /bai-viet/<tiêu đề không dấu> (lấy từ href trong
// lib/baiViet.ts). Dựng sẵn lúc build; đường dẫn lạ trả về 404. Mọi chữ riêng
// của từng bài nằm trong lib/baiViet.ts — không sửa ở đây khi thêm bài mới.
const SITE_URL = "https://chonquachuan.vn";

const bySlug = (slug: string) => BAI_VIET.find((b) => baiVietSlug(b) === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return BAI_VIET.map((b) => ({ slug: baiVietSlug(b) }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const bai = bySlug(params.slug);
  if (!bai) return {};
  // Link chia sẻ qua Zalo/Facebook hiện ảnh của chính bài (không phải ảnh sen
  // chung của site) — khai báo openGraph ở trang con thay thế hẳn bản ở layout.
  const anh = { url: `${SITE_URL}${bai.anh}`, width: bai.anhRong, height: bai.anhCao, alt: bai.anhAlt };
  return {
    title: bai.title,
    description: bai.tomTat,
    alternates: { canonical: bai.href },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${bai.href}`,
      siteName: "Chọn Quà Chuẩn",
      locale: "vi_VN",
      title: bai.title,
      description: bai.tomTat,
      publishedTime: bai.ngayDang,
      images: [anh],
    },
    twitter: { card: "summary_large_image", title: bai.title, description: bai.tomTat, images: [anh.url] },
  };
}

export default function BaiVietPage({ params }: { params: { slug: string } }) {
  const bai = bySlug(params.slug);
  if (!bai) notFound();

  const khac = BAI_VIET.filter((b) => b.id !== bai.id).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: bai.title,
      description: bai.tomTat,
      image: `${SITE_URL}${bai.anh}`,
      datePublished: bai.ngayDang,
      author: { "@type": "Organization", name: "Chọn Quà Chuẩn", url: SITE_URL },
      publisher: { "@type": "Organization", name: "Chọn Quà Chuẩn", url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}${bai.href}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: bai.title, item: `${SITE_URL}${bai.href}` },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <article className="px-6 sm:px-9 md:px-[72px] pt-8 md:pt-12 pb-16">
        <div className="mx-auto w-full max-w-[760px] flex flex-col gap-6">
          <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-soft">
            <Link href="/" className="font-medium">
              Trang chủ
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/#kien-thuc-chon-qua" className="font-medium">
              Kiến thức chọn quà
            </Link>
          </nav>

          <header className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-[#B45309]">
                {bai.chuyenMuc}
              </span>
              <time dateTime={bai.ngayDang} className="text-ink-soft text-[13px]">
                {ngayVN(bai.ngayDang)}
              </time>
            </div>
            <h1 className="font-serif text-[30px] md:text-[40px] leading-tight [text-wrap:balance]">
              {bai.title}
            </h1>
          </header>

          <figure className="flex flex-col gap-2">
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-line"
              style={{ aspectRatio: `${bai.anhRong} / ${bai.anhCao}` }}
            >
              <Image
                src={bai.anh}
                alt={bai.anhAlt}
                fill
                sizes="(max-width: 820px) 100vw, 760px"
                className="object-cover"
                priority
              />
            </div>
            {bai.anhGhiChu && (
              <figcaption className="text-ink-soft text-[13px] italic">{bai.anhGhiChu}</figcaption>
            )}
          </figure>

          <div className="flex flex-col gap-4 text-[16px] md:text-[17px] leading-[1.75]">
            {bai.moDau.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {bai.yChinhDanDat && <p className="font-semibold">{bai.yChinhDanDat}</p>}
          </div>

          <ol className="flex flex-col gap-4">
            {bai.yChinh.map((y, i) => (
              <li key={y.tieuDe} className="rounded-2xl border border-line bg-surface p-5 md:p-6 flex gap-4">
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-[18px] font-bold leading-snug">{y.tieuDe}</h2>
                  <p className="text-[15.5px] leading-[1.7] text-ink-soft">{y.noiDung}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-4 text-[16px] md:text-[17px] leading-[1.75]">
            {bai.ketBai.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Khung moi tu van - cung nen xanh voi khu San pham noi bat o trang
              chu. Form dung chung LeadFormTrigger nen lead ve Supabase + Sheet
              nhu moi form khac (source "bai-viet"). */}
          <aside
            className="rounded-[20px] p-6 md:p-8 flex flex-col gap-4"
            style={{ background: "linear-gradient(135deg, #E3F3FF 0%, #A8D8F8 100%)" }}
          >
            <p className="font-serif text-[20px] md:text-[22px] leading-snug text-[#1A1006]">{bai.loiMoiTuVan}</p>
            <div className="flex flex-wrap gap-3">
              <LeadFormTrigger
                productId={`bai-viet-${bai.id}`}
                productLabel={`Tư vấn từ bài viết: ${bai.title}`}
                triggerLabel="Nhận tư vấn ngay"
                source="bai-viet"
                triggerClassName="inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 text-[15px] font-bold bg-[#FFC633] text-[#1A1006] shadow-md min-h-[44px]"
              />
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3.5 text-[15px] font-bold bg-white text-[#1A1006] min-h-[44px]"
              >
                <ZaloIcon size={20} />
                Nhắn Zalo OA
              </a>
              <a
                href={`tel:${HOTLINE_TEL}`}
                className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3.5 text-[15px] font-bold border-2 border-[#1A1006] text-[#1A1006] bg-white/60 min-h-[44px]"
              >
                Hotline {HOTLINE}
              </a>
            </div>
          </aside>

          {khac.length > 0 && (
            <section className="flex flex-col gap-3 pt-4">
              <h2 className="font-serif text-[22px]">Bài viết khác</h2>
              <ul className="flex flex-col divide-y divide-line border border-line rounded-2xl bg-surface">
                {khac.map((b) => (
                  <li key={b.id}>
                    <Link href={b.href} className="flex items-center justify-between gap-3 px-4 py-3.5 text-[15px] font-semibold">
                      {b.title}
                      <ArrowRightIcon size={15} color="currentColor" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      <footer className="px-9 py-8 md:px-[72px] border-t border-line flex items-center justify-between gap-3 flex-wrap">
        <span className="font-serif font-semibold text-[15px]">Chọn Quà Chuẩn</span>
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/danh-muc" className="text-ink-soft text-[13px] font-medium">
            Danh mục
          </Link>
          <Link href="/lien-he" className="text-ink-soft text-[13px] font-medium">
            Liên hệ
          </Link>
          <span className="text-ink-soft text-[13px]">© 2026 Nguyên Khánh Vina · chonquachuan.vn</span>
        </div>
      </footer>
    </div>
  );
}
