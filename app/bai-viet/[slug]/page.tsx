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

  // Muc luc cot trai (man hinh rong): cac khoi lon cua bai, bam la cuon toi.
  const mucLuc = [
    ...(bai.soSanh ? [{ id: "so-sanh", nhan: bai.soSanh.tieuDe }] : []),
    ...bai.yChinh.map((y, i) => ({ id: `y-${i + 1}`, nhan: y.tieuDe })),
    ...(bai.hoiDap?.length ? [{ id: "hoi-dap", nhan: "Câu hỏi thường gặp" }] : []),
    { id: "tu-van", nhan: "Nhận tư vấn" },
  ];

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
    // Cau hoi thuong gap cua bai (neu co) — giup Google/Bing/AI hieu day la hoi–dap.
    ...(bai.hoiDap?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: bai.hoiDap.map((h) => ({
              "@type": "Question",
              name: h.hoi,
              acceptedAnswer: { "@type": "Answer", text: h.dap },
            })),
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      {/* 2026-09-30 (chi Nga khoanh 2 khoang trong hai ben bai tren may tinh):
          tu 2xl (1536px) trang thanh 3 cot; xl (1280px) 2 cot: bai + cot phai — trai: muc luc + link catalogue
          (dinh khi cuon); giua: bai; phai: khung tu van + bai khac (dinh khi
          cuon). Duoi xl van 1 cot nhu cu, hai cot ben an di. */}
      <div className="px-6 sm:px-9 md:px-[72px] pt-8 md:pt-12 pb-16">
        <div className="mx-auto w-full max-w-[760px] xl:max-w-[1560px] xl:grid xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(220px,300px)_minmax(0,820px)_minmax(280px,360px)] xl:justify-between xl:gap-10 2xl:gap-14">
          <aside className="hidden 2xl:block">
            <div className="sticky top-6 flex flex-col gap-5">
              <nav
                aria-label="Mục lục bài viết"
                className="rounded-2xl border border-line bg-surface p-5 flex flex-col gap-3"
              >
                <span className="text-[12px] font-bold uppercase tracking-wide text-[#B45309]">Trong bài này</span>
                <ol className="flex flex-col gap-2.5">
                  {mucLuc.map((m, i) => (
                    <li key={m.id}>
                      <a
                        href={`#${m.id}`}
                        className="flex gap-2.5 text-[14px] leading-snug font-medium text-ink-soft hover:text-[#15803D]"
                      >
                        <span className="w-5 shrink-0 text-[#15803D] font-bold tabular-nums">{i + 1}</span>
                        {m.nhan}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {bai.lienKet && bai.lienKet.length > 0 && (
                <div className="flex flex-col gap-3">
                  {bai.lienKet.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                      className="rounded-2xl border-2 border-[#15803D] bg-surface p-4 flex flex-col gap-1"
                    >
                      <span className="inline-flex items-center gap-2 text-[14.5px] font-bold text-[#15803D]">
                        {l.nhan}
                        <ArrowRightIcon size={14} color="currentColor" />
                      </span>
                      <span className="text-[13px] text-ink-soft">{l.moTa}</span>
                    </a>
                  ))}
                </div>
              )}

              <Link
                href="/ebook"
                className="rounded-2xl p-5 flex flex-col gap-1.5"
                style={{ background: "linear-gradient(135deg, #DCFCE7, #BBF7D0)" }}
              >
                <span className="text-[11.5px] font-bold uppercase tracking-wide text-[#15803D]">
                  Quà tặng miễn phí
                </span>
                <span className="font-serif font-semibold text-[17px] leading-snug text-[#1A1006]">
                  Ebook &amp; thiệp tranh gửi tặng người thân
                </span>
                <span className="text-[13.5px] text-[#1A1006]/75">Đọc và tải miễn phí →</span>
              </Link>
            </div>
          </aside>

          <article className="flex flex-col gap-6 min-w-0">
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
          </div>

          {bai.soSanh && (
            <section id="so-sanh" className="flex flex-col gap-3 scroll-mt-6">
              <h2 className="font-serif text-[22px] md:text-[24px] leading-snug">{bai.soSanh.tieuDe}</h2>
              <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
                <table className="w-full min-w-[560px] border-collapse text-[14.5px] leading-[1.55]">
                  <thead>
                    <tr className="bg-[#DCFCE7] text-left">
                      {bai.soSanh.cot.map((c) => (
                        <th key={c} scope="col" className="px-4 py-3 font-bold">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bai.soSanh.dong.map((d) => (
                      <tr key={d[0]} className="border-t border-line align-top">
                        {d.map((o, i) =>
                          i === 0 ? (
                            <th key={i} scope="row" className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                              {o}
                            </th>
                          ) : (
                            <td key={i} className="px-4 py-3 text-ink-soft">
                              {o}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {bai.yChinhDanDat && (
            <p className="font-semibold text-[16px] md:text-[17px] leading-[1.75]">{bai.yChinhDanDat}</p>
          )}

          <ol className="flex flex-col gap-4">
            {bai.yChinh.map((y, i) => (
              <li
                key={y.tieuDe}
                id={`y-${i + 1}`}
                className="rounded-2xl border border-line bg-surface p-5 md:p-6 flex gap-4 scroll-mt-6"
              >
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

          {bai.lienKet && bai.lienKet.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {bai.lienKet.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="rounded-2xl border-2 border-[#15803D] bg-surface p-5 flex flex-col gap-1.5 min-h-[44px]"
                >
                  <span className="inline-flex items-center gap-2 text-[16px] font-bold text-[#15803D]">
                    {l.nhan}
                    <ArrowRightIcon size={15} color="currentColor" />
                  </span>
                  <span className="text-[14px] text-ink-soft">{l.moTa}</span>
                </a>
              ))}
            </div>
          )}

          {bai.hoiDap && bai.hoiDap.length > 0 && (
            <section id="hoi-dap" className="flex flex-col gap-3 scroll-mt-6">
              <h2 className="font-serif text-[22px] md:text-[24px] leading-snug">Câu hỏi thường gặp</h2>
              <div className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-surface">
                {bai.hoiDap.map((h) => (
                  <div key={h.hoi} className="p-5 flex flex-col gap-1.5">
                    <h3 className="text-[16.5px] font-bold leading-snug">{h.hoi}</h3>
                    <p className="text-[15.5px] leading-[1.7] text-ink-soft">{h.dap}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-col gap-4 text-[16px] md:text-[17px] leading-[1.75]">
            {bai.ketBai.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Khung moi tu van - cung nen xanh voi khu San pham noi bat o trang
              chu. Form dung chung LeadFormTrigger nen lead ve Supabase + Sheet
              nhu moi form khac (source "bai-viet"). */}
          <aside
            id="tu-van"
            className="rounded-[20px] p-6 md:p-8 flex flex-col gap-4 scroll-mt-6"
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
            <section className="flex flex-col gap-3 pt-4 xl:hidden">
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
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-6 flex flex-col gap-5">
              <div
                className="rounded-[20px] p-5 flex flex-col gap-3"
                style={{ background: "linear-gradient(135deg, #E3F3FF 0%, #A8D8F8 100%)" }}
              >
                <span className="text-[11.5px] font-bold uppercase tracking-wide text-[#1A1006]/70">
                  Tư vấn miễn phí
                </span>
                <p className="font-serif text-[18px] leading-snug text-[#1A1006]">
                  Cần chọn quà cho doanh nghiệp? Để lại thông tin, Chọn Quà Chuẩn báo giá trong ngày.
                </p>
                <LeadFormTrigger
                  productId={`bai-viet-${bai.id}`}
                  productLabel={`Tư vấn từ bài viết: ${bai.title}`}
                  triggerLabel="Nhận tư vấn ngay"
                  source="bai-viet"
                  triggerClassName="inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[15px] font-bold bg-[#FFC633] text-[#1A1006] shadow-md min-h-[44px] w-full"
                />
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[15px] font-bold bg-white text-[#1A1006] min-h-[44px]"
                >
                  <ZaloIcon size={20} />
                  Nhắn Zalo OA
                </a>
                <a
                  href={`tel:${HOTLINE_TEL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[15px] font-bold border-2 border-[#1A1006] text-[#1A1006] bg-white/60 min-h-[44px]"
                >
                  Hotline {HOTLINE}
                </a>
              </div>

              {khac.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="font-serif text-[19px]">Bài viết khác</span>
                  {khac.map((b) => (
                    <Link
                      key={b.id}
                      href={b.href}
                      className="rounded-2xl overflow-hidden border border-line bg-surface flex flex-col"
                    >
                      <span className="relative block w-full" style={{ aspectRatio: `${b.anhRong} / ${b.anhCao}` }}>
                        <Image src={b.anh} alt={b.anhAlt} fill sizes="360px" className="object-cover" />
                      </span>
                      <span className="p-4 flex flex-col gap-1">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-[#B45309]">
                          {b.chuyenMuc}
                        </span>
                        <span className="font-serif font-semibold text-[15.5px] leading-snug text-[#1A1006]">
                          {b.title}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <footer className="px-9 py-8 md:px-[72px] border-t border-line flex items-center justify-between gap-3 flex-wrap">
        <span className="font-serif font-semibold text-[15px]">Chọn Quà Chuẩn</span>
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/lien-he" className="text-ink-soft text-[13px] font-medium">
            Liên hệ
          </Link>
          <span className="text-ink-soft text-[13px]">© 2026 Nguyên Khánh Vina · chonquachuan.vn</span>
        </div>
      </footer>
    </div>
  );
}
